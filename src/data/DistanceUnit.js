'use es6';

import { Enum } from 'enumify';

export default class DistanceUnit extends Enum {}

DistanceUnit.init(['MILE', 'KILOMETER']);
