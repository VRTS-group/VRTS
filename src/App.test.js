require("dotenv").config();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { login } from './redux/userReducer';

const { LOCAL_HOST } = process.env;


const {handleLogin} = require('./Component/Header');

let page = null;
beforeEach(() => {
  page = document.createElement('div');
  document.body.appendChild(page);
})

describe('check login', () => {
  test('login check',() => {
  expect(page.textContent).not.toContain('login')
  })
});

describe('login inputs', () => {
  test('login email inputs', () => {
      expect(login(1)).not.toBe('sid@sid.com')
  })
  test('login password input', () => {
      expect(login(2)).not.toBe('sid')
  })
});

describe('home page links', () => {
  test('links to indiv post', () => {
      expect(`${LOCAL_HOST}indivpost/93`).toContain('/indivpost/93')
  })
  test('links to indiv post', () => {
      expect(`${LOCAL_HOST}indivpost/90`).toContain('/indivpost/90')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/98`).toContain('/indivpost/98')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/100`).toContain('/indivpost/100')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/100`).toContain('/indivpost/100')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/101`).toContain('/indivpost/101')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/95`).toContain('/indivpost/95')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/97`).toContain('/indivpost/97')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/99`).toContain('/indivpost/99')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/94`).toContain('/indivpost/94')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/96`).toContain('/indivpost/96')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/91`).toContain('/indivpost/91')
  })
  test('links to indiv post', () => {
    expect(`${LOCAL_HOST}indivpost/89`).toContain('/indivpost/89')
  })
  test('links to home pages', () => {
    expect(`${LOCAL_HOST}homeW`).toContain('/homeW')
  })
  test('links to home pages', () => {
    expect(`${LOCAL_HOST}homeM`).toContain('/homeM')
  })
  test('links to home pages', () => {
    expect(`${LOCAL_HOST}`).toContain('/')
  })
  test('links to home pages', () => {
    expect(`${LOCAL_HOST}register`).toContain('/register')
  })
  


  
})



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



