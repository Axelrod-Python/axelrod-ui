import * as React from 'react';

const axelrodLib = <a href="https://github.com/Axelrod-Python/Axelrod">Axelrod python</a>;
const axelrodApi = <a href="https://github.com/Axelrod-Python/axelrod-api">Axelrod API</a>;
const prisonerDilemma = <a href="https://en.wikipedia.org/wiki/Prisoner%27s_dilemma">prisoners dilemma</a>;
const documentation = <a href="https://axelrod.readthedocs.io/en/latest/">documentation</a>;
const github = <a href="https://github.com/erik-sn/axelrod-ui">github</a>;
const react = <a href="https://facebook.github.io/react/">React</a>;
const redux = <a href="http://redux.js.org/">Redux</a>;
const typescript = <a href="https://www.typescriptlang.org/">TypeScript</a>;

const About = () => (
  <div className="about__container" >
    <div className="about__inner-container">
      <h1>Axelrod UI</h1>
      <p>
        This application is designed to be a graphical interface
        for the {axelrodLib} library. It implements the {axelrodApi} as
        a backend service to supply strategies, run contests, and analyze
        results.
      </p>
      <p>
        The axelrod library studies the iterated {prisonerDilemma}. The
        full capabilities of the library can be found in its {documentation}.
      </p>
      <p>
        The code for this project is open sourced on {github}. Primary technologies
        involved:
        <ul>
          <li>{react}</li>
          <li>{redux}</li>
          <li>{typescript}</li>
        </ul>
      </p>
    </div>
  </div>
);

export default About;
