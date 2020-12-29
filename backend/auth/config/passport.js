"use strict";

import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../s')