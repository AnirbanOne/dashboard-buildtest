import React from "react";
import styled, { keyframes, css } from "styled-components";

function MarqueeComp() {
  const row1 = [
    "https://www.startupindia.gov.in/content/dam/invest-india/new-banner/applications-are-open-big.jpg",
    "https://www.davp.nic.in/images/main_rotator_elec/elec.png",
    "https://testwale.s3.amazonaws.com/media/froala_editor/uploads/Maritime%20India%20Vision%202030.png",
    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202211/g20_india-sixteen_nine.jpg?VersionId=ELdu9C9E6F6Fx.UY5e4w2WDcVU9snttM",
    "https://wcd.nic.in/sites/default/files/akam-home-banner-eng.jpg",
    "https://www.mofpi.gov.in/sites/default/files/yoga_banner.jpg",
  ];

  const row2 = [
    "https://www.msde.gov.in/sites/default/files/2022-10/Agnipath-Yojna.jpg",
    "https://dst.gov.in/sites/default/files/Banner_3.jpg",
    "https://www.indiaculture.gov.in/sites/default/files/homepage_banner/WEB_BANNER_13062023.jpg",
    "https://cbpssubscriber.mygov.in/assets/uploads/juGajmc1gOVBUtt5?92",
    "https://www.msde.gov.in/sites/default/files/2023-05/banner05.jpg",
    "https://www.meity.gov.in/writereaddata/files/banner/MeitY-Website_0.png",
  ];

  return (
    <AppContainer>
      <Wrapper>
        <Text>नयी बातें, नया समय!</Text>
        <Marquee>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee2>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee2>
      </Wrapper>
    </AppContainer>
  );
}

export default MarqueeComp;

const AppContainer = styled.div`

  color: #000000;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );

  @media (max-width: 768px) {
    flex-direction: column;
    height: 60vh;
    align-items: center;
    justify-content: center;
    overflow: hidden
  }
`;

const Marquee2 = styled.div`
  display: flex;
  width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );

  @media (max-width: 768px) {
    display: none;
  }
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const scrollY = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;

  @media(max-width: 768px){
    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollY} 30s linear infinite;
  }
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;

  @media(max-width: 768px){
    display:none;
  }
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
