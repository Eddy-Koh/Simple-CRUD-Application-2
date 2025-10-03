// user.model.spec.ts
import { User } from './user.model';

describe('User interface', () => {
  it('should match expected structure', () => {
    const user: User = {
      id: 1,
      username: 'testuser',
      roleId: 2
    };
    expect(user).toBeTruthy();
    expect(user.username).toBe('testuser');
  });
});
