import React from 'react';
import chore from './chore';

export interface choreList {
        author: string,
        editors: string,
        viewers: string,
        chores: chore[],
}

export default choreList;