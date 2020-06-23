/**
 * @license
 * Copyright CERN and copyright holders of ALICE O2. This software is
 * distributed under the terms of the GNU General Public License v3 (GPL
 * Version 3), copied verbatim in the file "COPYING".
 *
 * See http://alice-o2.web.cern.ch/license for full licensing information.
 *
 * In applying this license CERN does not waive the privileges and immunities
 * granted to it by virtue of its status as an Intergovernmental Organization
 * or submit itself to any jurisdiction.
 */

const {
    repositories: {
        LogRepository,
    },
    utilities: {
        QueryBuilder,
    },
} = require('../../../lib/database');
const chai = require('chai');

const { expect } = chai;

module.exports = () => {
    describe('WhereQueryBuilder', () => {
        describe('not', () => {
            it('should return a single entity which does not have the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').not().is('1');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result).to.not.be.null;
                expect(result.id).to.equal(2);
            });

            it('should return entities not with the id in the provided range', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').not().between(1, 3);

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(2);
                expect(result[0].id).to.equal(4);
                expect(result[1].id).to.equal(5);
            });

            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').not().oneOf('1', 2);
                queryBuilder.orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result).to.not.be.null;
                expect(result.id).to.equal(3);
            });

            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').not().allOf('1', 2);
                queryBuilder.orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result).to.not.be.null;
                expect(result.id).to.equal(3);
            });
        });

        describe('between', () => {
            it('should return entities with the id in the provided range', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').between(1, '3');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(3);
                expect(result[0].id).to.equal(1);
                expect(result[1].id).to.equal(2);
                expect(result[2].id).to.equal(3);
            });
        });

        describe('is', () => {
            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').is('1');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(1);
                expect(result[0].id).to.equal(1);
            });
        });

        describe('allOf', () => {
            it('should return no entities', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').allOf(1, 2);

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(0);
            });
        });

        describe('oneOf', () => {
            it('should return a single entity with the provided id', async () => {
                const queryBuilder = new QueryBuilder();
                queryBuilder.where('id').oneOf('1', 2);
                queryBuilder.orderBy('id', 'asc');

                const result = await LogRepository.findAll(queryBuilder);
                expect(result).to.not.be.null;
                expect(result).to.have.lengthOf(2);
                expect(result[0].id).to.equal(1);
                expect(result[1].id).to.equal(2);
            });
        });

        describe('startsWith', () => {
            it('should return a single entity of which the title starts with ...', async () => {
                const queryBuilder = new QueryBuilder()
                    .where('text').startsWith('Power interruption')
                    .orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result.text).to.equal('Power interruption due to unplugged wire.');
            });

            it('should return a single entity of which the title not starts with ...', async () => {
                const queryBuilder = new QueryBuilder()
                    .where('text').not().startsWith('Power interruption')
                    .orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result.text).to.equal('Detected particle ABC123');
            });
        });

        describe('endsWith', () => {
            it('should return a single entity of which the title ends with ...', async () => {
                const queryBuilder = new QueryBuilder()
                    .where('text').endsWith('accelerator!')
                    .orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result.text).to.equal('Cake at the particle accelerator!');
            });

            it('should return a single entity of which the title not ends with ...', async () => {
                const queryBuilder = new QueryBuilder()
                    .where('text').not().endsWith('accelerator!')
                    .orderBy('id', 'asc');

                const result = await LogRepository.findOne(queryBuilder);
                expect(result.text).to.equal('Power interruption due to unplugged wire.');
            });
        });
    });
};
