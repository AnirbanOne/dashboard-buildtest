import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get("/widgetdata", (req, res) => {
    const query1 = "SELECT COUNT(*) AS total_rows FROM why.`demo.csv`;";
    const query2 = "SELECT State, COUNT(*) AS state_occurrence FROM why.`demo.csv` GROUP BY State ORDER BY state_occurrence DESC LIMIT 1;";
    const query3 = "SELECT `Sector Type`, COUNT(*) AS sector_occurrence FROM why.`demo.csv` GROUP BY `Sector Type` ORDER BY sector_occurrence DESC LIMIT 1;";
    const query4 = `
      SELECT State, COUNT(*) AS state_occurrence,
        ((SELECT COUNT(*) FROM why.\`demo.csv\` WHERE State = t.State) / (
          (SELECT COUNT(*) FROM why.\`demo.csv\`) - 
          (SELECT COUNT(*) FROM why.\`demo.csv\` WHERE State = t.State)
        )) * 100 AS percentage
      FROM why.\`demo.csv\` t
      GROUP BY State
      HAVING COUNT(*) = (
        SELECT MAX(state_occurrence)
        FROM (
          SELECT COUNT(*) AS state_occurrence
          FROM why.\`demo.csv\`
          GROUP BY State
        ) subquery
      )`;
  
    const query5 = `
      SELECT \`Sector Type\`, COUNT(*) AS sector_occurrence,
        ((SELECT COUNT(*) FROM why.\`demo.csv\` WHERE \`Sector Type\` = t.\`Sector Type\`) / (
          (SELECT COUNT(*) FROM why.\`demo.csv\`) - 
          (SELECT COUNT(*) FROM why.\`demo.csv\` WHERE \`Sector Type\` = t.\`Sector Type\`)
        )) * 100 AS percentage
      FROM why.\`demo.csv\` t
      GROUP BY \`Sector Type\`
      HAVING COUNT(*) = (
        SELECT MAX(sector_occurrence)
        FROM (
          SELECT COUNT(*) AS sector_occurrence
          FROM why.\`demo.csv\`
          GROUP BY \`Sector Type\`
        ) subquery
      )`;
  
    const query6 = `
      SELECT 
          t1.year AS year,
          t1.user_count,
          ABS(((t1.user_count - t2.user_count_last_year) / t2.user_count_last_year) * 100) AS percentage_increase
      FROM 
          (SELECT 
               YEAR(\`Date of Registration\`) AS year,
               COUNT(*) AS user_count
           FROM 
               why.\`demo.csv\`
           GROUP BY 
               YEAR(\`Date of Registration\`)) t1
      JOIN 
          (SELECT 
               YEAR(\`Date of Registration\`) - 1 AS year_last_year,
               COUNT(*) AS user_count_last_year
           FROM 
               why.\`demo.csv\`
           WHERE 
               YEAR(\`Date of Registration\`) = YEAR(CURRENT_DATE) - 1
           GROUP BY 
               YEAR(\`Date of Registration\`) - 1) t2 ON t1.year = t2.year_last_year
      ORDER BY 
          t1.year ASC;
    `;
  
    db.query(query1, (err, result1) => {
      if (err) {
        res.status(500).json({ error: "Error in query 1" });
        return;
      }
  
      const totalRows = result1[0].total_rows;
  
      db.query(query2, (err, result2) => {
        if (err) {
          res.status(500).json({ error: "Error in query 2" });
          return;
        }
  
        const stateWithLargestOccurrence = result2[0];
  
        db.query(query3, (err, result3) => {
          if (err) {
            res.status(500).json({ error: "Error in query 3" });
            return;
          }
  
          const sectorWithLargestOccurrence = result3[0];
  
          db.query(query4, (err, result4) => {
            if (err) {
              res.status(500).json({ error: "Error in query 4" });
              return;
            }
  
            const stateWithLargestPercentage = result4[0];
  
            db.query(query5, (err, result5) => {
              if (err) {
                res.status(500).json({ error: "Error in query 5" });
                return;
              }
  
              const sectorWithLargestPercentage = result5[0];
  
              db.query(query6, (err, result6) => {
                if (err) {
                  res.status(500).json({ error: "Error in query 6" });
                  return;
                }
  
                res.json({
                  total_rows: totalRows,
                  state_occurrence: stateWithLargestOccurrence,
                  sector_occurrence: sectorWithLargestOccurrence,
                  state_percentage: stateWithLargestPercentage,
                  sector_percentage: sectorWithLargestPercentage,
                  yearly_increase: result6,
                });
              });
            });
          });
        });
      });
    });
  });
  

export default router;
