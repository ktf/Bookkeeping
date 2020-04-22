/**
 * This file is part of the ALICE Electronic Logbook v2, also known as Jiskefet.
 * Copyright (C) 2020  Stichting Hogeschool van Amsterdam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { appendPath } = require('../../../../lib/framework/http/utils');
const chai = require('chai');

const { expect } = chai;

module.exports = () => {
    it('should handle no slashes', () => {
        const base = 'base';
        const appendix = 'appendix';
        expect(appendPath(base, appendix)).to.equal('/base/appendix');
    });

    it('should handle a slash only at the base', () => {
        const base = 'base/';
        const appendix = 'appendix';
        expect(appendPath(base, appendix)).to.equal('/base/appendix');
    });

    it('should handle a slash only at the appendix', () => {
        const base = 'base';
        const appendix = '/appendix';
        expect(appendPath(base, appendix)).to.equal('/base/appendix');
    });

    it('should handle slashes at both the base and appendix', () => {
        const base = 'base/';
        const appendix = '/appendix';
        expect(appendPath(base, appendix)).to.equal('/base/appendix');
    });

    it('should remove unneeded slashes', () => {
        const base = '//base///';
        const appendix = '////appendix///';
        expect(appendPath(base, appendix)).to.equal('/base/appendix');
    });
};
