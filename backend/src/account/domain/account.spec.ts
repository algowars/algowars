import { AccountImplementation } from './account';

describe('Account', () => {
    it('should compare id', () => {
        const expectedId = 'id';
        const account = new AccountImplementation({
            id: expectedId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            version: 1
        });

        expect(account.compareId(expectedId)).toBeTruthy();
    })
})