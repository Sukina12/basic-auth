'use strict';

require('dotenv').config();
const base64 = require('base-64');

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const request = supergoose(server.app);
const basic = require('../src/auth/middleware/basicAuth');
const response = require('express');

describe('Basic Auth', () => {
  it('POST sign up', async () => {
    const user = {
      username: 'sukina',
      password: '12345',
    };
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('sukina');
  });
  it('POST signin', async () => {
    let user = base64.encode('sukina:12345');
    let response = await request.post('/signin').set(`Authorization`, `Basic ${user}`);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('sukina');
  });
  describe('test middleware', () => {
    it('Basic Header', async () => {
      let user = base64.encode('sukina:12345');
      let response = await request.post('/signin').set(`Authorization`, `Basic ${user}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeTruthy();
    });
    it('The route assert requirement', async () => {
      const response = await request.post('/');
      expect(response.status).toBe(404);
    });
  });
});
