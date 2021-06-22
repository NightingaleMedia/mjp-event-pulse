import React from 'react';
import styled from 'styled-components';
import Counter__JustNumbers from '../../Counters/Counter__JustNumbers';
import DateParse from '../../assets/DateParse';
import Banner_ImgBg from '../../Banners/Banner_ImgBg';
import GameShow__Body from './GameShow__Body';
const Header = styled.div`
  height: 350px;
  background-color: white;
  && .inner {
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.green};
    display: grid;
    grid-template-columns: 20% 60% 20%;
    margin: auto;
    padding: 0 2%;
  }

  && img.logo {
    width: 75%;
    max-width: 300px;
    display: block;
  }
  && .counter {
    font-size: 1rem;
    margin: auto;
    color: white;
    background-color: ${(props) => props.theme.lightGreen};
    padding: 1rem 2rem;
    font-weight: 800;
  }
  @media all and (max-width: 1000px) {
    && .counter {
      padding: 0.5rem;
    }
  }
  @media all and (max-width: 650px) {
    && .inner {
      grid-template-columns: 100%;
    }
    && img.logo {
      width: auto;
      height: 180px;
    }
  }
`;

const HashTagBanner = styled.div`
  width: 100%;
  text-align: center;
  height: 200px;
  background-color: ${(props) => props.theme.lightGreen};
  color: white;
  font-size: clamp(1rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Futura-Bold;
`;
const Title = styled.h1`
  max-width: 500px;
  text-align: center;
  margin: 1rem auto;
  @media all and (max-width: 1000px) {
    font-size: 2rem !important;
    max-width: 80%;
  }
`;
const AboutBanner = styled.div`
  padding: 3rem;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  margin: 2rem auto;
  background-color: rgba(0, 78, 56, 0.9);
  && p {
    font-size: 1.5rem;
    color: white;
  }
`;
function GameShow__Main({ main_event, data }) {
  const start = main_event.eventStartEnd.StartDateTime;
  return (
    <>
      <Header>
        <div className="inner">
          <div></div>
          <div>
            <img className="logo" src={main_event.LogoLink[0].Media.url}></img>
            <DateParse date={start} />
          </div>
          <div className="counter">
            <Counter__JustNumbers prefix="Join Us Live In:" start={start} />
          </div>
        </div>
      </Header>
      <GameShow__Body
        data={data}
        src={main_event.streamLinks[0].url}
        start={start}
        chatSrc={main_event.streamLinks[1].url}
        imgSrc={main_event.LogoLink[0].Media.url}
      />
      <HashTagBanner>
        <div>#2021GameShowGala </div>
      </HashTagBanner>
      <Banner_ImgBg
        imgSrc={`https://storage.googleapis.com/mjp-stream-public/house-of-mercy-game-show-gala/banner.png`}
      >
        <AboutBanner id="about">
          <p>
            MercyOne House of Mercy is one of Iowa’s most comprehensive
            providers of vital behavioral health services, especially for
            parenting women with addiction.
          </p>
          <a href="https://www.mercyone.org/desmoines/house-of-mercy/"></a>
          <button>Learn More</button>
        </AboutBanner>
      </Banner_ImgBg>
      <div style={{ height: '100px', backgroundColor: 'black' }}></div>
    </>
  );
}

export default GameShow__Main;