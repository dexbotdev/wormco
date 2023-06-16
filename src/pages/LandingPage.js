import React from 'react'
import { IconBrandTelegram,IconBrandTwitter} from '@tabler/icons-react';
import { Grid } from '@mantine/core';
import { Group, ActionIcon } from '@mantine/core';
import ChartComponent from '../components/ChartComponent';
import './LandingPage.css'

import { Chip } from '@mantine/core';
import roadmapimg from '../assets/M.png'
import logo from '../assets/loogo_1.png'
const data = [
  { value: 62 },
  { value: 31 },
  { value: 7 }
];

// Character component
const Character = ({ animation, armPath }) => {
  const characterClass = `character -${animation}`;
  return (
    <svg
      className={characterClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 400"
    >
      <circle
        className="character__eye -eye-r"
        cx="87.59"
        cy="134.46"
        r="5.12"
      />
      <g id="body">
        <circle
          className="character__body -part-1"
          cx="140.71"
          cy="122.62"
          r="42.88"
        />
        <circle
          className="character__body -part-2"
          cx="166.95"
          cy="141.82"
          r="42.88"
        />
        <circle
          className="character__body -part-3"
          cx="191.26"
          cy="173.82"
          r="42.88"
        />
        <circle className="character__body" cx="197.02" cy="335.1" r="42.88" />
        <circle className="character__body" cx="197.02" cy="295.42" r="42.88" />
        <circle className="character__body" cx="206.62" cy="216.06" r="42.88" />
        <circle className="character__body" cx="205.98" cy="258.94" r="42.88" />
      </g>
      <circle
        className="character__eye -eye-l-extra"
        cx="87.59"
        cy="134.46"
        r="5.12"
      />
      <circle
        className="character__eye -eye-l"
        cx="115.11"
        cy="134.46"
        r="5.12"
      />
    </svg>
  );
};

// Left arm component
const ArmLeft = ({ animation, armPath }) => (
  <svg className="arm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    {animation === "typing" && <path className="arm-typing-left" d={armPath} />}
    {animation === "stressed" && (
      <path className="arm-typing-left" d={armPath} />
    )}
    {animation === "waiting" && (
      <path d="M175.27,152.06s55.19,87.24-65.77,74.44" />
    )}
    {animation === "thinking" && (
      <path d="M175.93,152.78s-10.18,82-36.43,103.72" />
    )}
    {animation === "passive" && (
      <path d="M175.93,152.78s-10.18,82-36.43,103.72" />
    )}
    {animation === "sleeping" && (
      <path d="M175.93,152.78s-10.18,82-36.43,103.72" />
    )}
  </svg>
);

// Right arm component
const ArmRight = ({ animation, armPath }) => (
  <svg className="arm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
    {animation === "typing" && (
      <path className="arm-typing-right" d={armPath} />
    )}
    {animation === "stressed" && (
      <path className="arm-typing-right" d={armPath} />
    )}
    {animation === "waiting" && (
      <path d="M207.26,171.26s45.19,85-75.76,72.24" />
    )}
    {animation === "thinking" && (
      <path
        className="arm-thinking-right"
        d="M207.48,172.34s-76,114.16-93-9.84"
      />
    )}
    {animation === "passive" && (
      <path d="M207.93,172c.57-.48,11.3,86.45-23.43,112.52" />
    )}
    {animation === "sleeping" && (
      <path d="M207.93,172c.57-.48,11.3,86.45-23.43,112.52" />
    )}
  </svg>
);

// Computer component
const Computer = ({ animation }) => {
  const computerClass = `computer -${animation}`;
  return (
    <svg
      className={computerClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 82 55"
    >
      <polygon
        className="computer__keyboard"
        points="29,42.5 81,51.5 45,55.5 30,49.5 "
      />
      <path
        className="computer__keyboard"
        d="M80.3,55.5H45.7c-0.9,0-1.7-0.7-1.7-1.7v-0.7c0-0.9,0.7-1.7,1.7-1.7h34.7c0.9,0,1.7,0.7,1.7,1.7v0.7
        C82,54.8,81.2,55.5,80.3,55.5z"
      />
      <path
        className="computer__screen"
        d="M38.9,55.4l-27.3-6.3c-1.6-0.4-2.8-1.6-3.1-3.2l-8.4-41C-0.5,2.2,1.7-0.2,4.5,0l27.4,2.5
        c1.8,0.2,3.3,1.5,3.7,3.3l8.3,44.8C44.4,53.6,41.8,56.1,38.9,55.4z"
      />
    </svg>
  );
};

// Table component
const Table = () => (
  <svg
    className="table"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 530 160.1"
  >
    <polygon points="530,65.8 197.7,0 0,10.6 274.9,160.1 " />
  </svg>
);

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: "sleeping",
      armPath: "M 207 171",
      frequency: 3,
      amplitude: 0.1,
      xstart: 207,
      ystart: 171,
      length: 110,
      offset: 0,
      fps: 60,
      opened: false
    };


    this.createCurve = this.createCurve.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
    this.setConfig = this.setConfig.bind(this);
    this.updateArms = this.updateArms.bind(this);
    this.loop = this.loop.bind(this);
    this.loopref = null;
  }

  createCurve(x, offset, inverted = false) {
    const { frequency, ystart, xstart, amplitude } = this.state;
    const phase = inverted
      ? Math.sqrt(x * frequency) - offset
      : Math.sqrt(x * frequency) + offset;
    return ystart - Math.sin(phase) * (x - xstart) * amplitude;
  }

  updateArms() {
    const { ystart, xstart, length } = this.state;
    let x = xstart;
    let dataL = `M ${xstart} ${ystart}`;
    let dataR = `M ${xstart} ${ystart}`;

    while (x < xstart + length) {
      const newYL = this.createCurve(x, this.state.offset);
      const newYR = this.createCurve(x, this.state.offset, true);
      dataL = `${dataL} L ${x} ${newYL}`;
      dataR = `${dataR} L ${x} ${newYR}`;
      x += 1;
    }
    this.setState({
      armPathL: dataL,
      armPathR: dataR
    });
  }

  loop() {
    const { offset, animation, fps } = this.state;
    if (animation !== "typing" && animation !== "stressed") {
      clearTimeout(this.loopRef);
      return;
    }
    this.setState({
      offset: offset + 0.3
    });
    this.updateArms();
    this.loopRef = setTimeout(() => {
      requestAnimationFrame(this.loop);
    }, 1000 / fps);
  }

  openGame() {
    this.setState({
      opened: true,
    });
  }

  setAnimation(newAnimation, speed) {
    this.setState({
      animation: newAnimation,
      fps: speed || 60
    });
    if (newAnimation === "typing" || newAnimation === "stressed") {
      clearTimeout(this.loopRef);
      requestAnimationFrame(this.loop);
    }
  }

  setConfig(e) {
    const type = e.target.name;
    console.log(type);
    this.setState({
      [type]: e.target.value
    });
  }

  render() {
     return (
      <div className="app">
        <Grid style={{ 'width': '100%' }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} grow justify="center" align="center">
          <Grid.Col span={4} style={{ 'textAlign': 'center', 'verticalAlign': 'center', 'justifyItems': 'center' }}>
            <img src={logo} width="180px" alt="logo"/>
          </Grid.Col>
          <Grid.Col span={4}><h1 style={{ 'fontSize': '5em' }}>Wormco</h1></Grid.Col>
          <Grid.Col span={4}><Group spacing={10} position="center" noWrap>
            <ActionIcon size="lg" component="a" href="https://t.me/wormcoeth">
              <IconBrandTelegram size="3rem" stroke={1.5} />
            </ActionIcon> 
            <ActionIcon size="lg" component="a" href="https://twitter.com/Wormcoeth">
              <IconBrandTwitter size="3rem" stroke={1.5} />
            </ActionIcon> 
          </Group></Grid.Col>
        </Grid>

        <div className="wrapper">
          <ArmLeft
            animation={this.state.animation}
            armPath={this.state.armPathL}
          />
          <Character animation={this.state.animation} />
          <ArmRight
            animation={this.state.animation}
            armPath={this.state.armPathR}
          />
          <Table />
          <Computer animation={this.state.animation} />
        </div>
        <div className="controls">
          <button onClick={() => this.setAnimation("passive")}>Gem Found</button>
          <button onClick={() => this.setAnimation("stressed")}>Ape Or Not</button>
          <button onClick={() => this.setAnimation("waiting")}>Degen R&D</button>
          <button onClick={() => this.setAnimation("thinking")}>
            More R&D
          </button>
          <button onClick={() => this.setAnimation("typing")}>FOMO</button>
        </div>
        

        <h2>Tokenomics</h2>

        <ChartComponent data={data} />

        <div className="controls">
          <Chip.Group>
            <Group position="center">
              <Chip >total supply - 100k</Chip>
              <Chip >62% - PRESALE</Chip>
              <Chip >31% - LIQUIDITY</Chip>
              <Chip >7% - MARKETING</Chip> 
              </Group>
          </Chip.Group>
        </div>

        <h2>RoadMap</h2>

          <img src={roadmapimg} width="100%" alt="roadmap" />
          <h2>   .</h2> 
          <div className="controlsA"> 
          <h3>$WORM will forever be 0 tax, no team tokens, contract rennounced and 100k supply!</h3>
          <h3>That means we the degen $WORM will make it in WORMCO and emerge victorius and end this vicious cycle of poverty!</h3>
          </div>
      </div>
    );
  }
}


export default LandingPage;
