import { GroupService } from './group.service';
import { HttpError } from '../../utils';

jest.mock('./group.model');

describe('Group entity', () => {
  let group: { Group: any };
  beforeAll(async () => {
    group = await import('./group.model');
  });
  const groups = [
    {
      permissions: ['READ', 'UPLOAD_FILES'],
      id: '54fa0888-c416-4b6d-b938-b0a141157b7f',
      name: 'BA',
    },
    {
      permissions: ['READ', 'WRITE'],
      id: '5c87ec6e-ec07-4c6e-93c4-ec8e3df4808c',
      name: 'DEVELOPER',
    },
    {
      permissions: ['READ', 'WRITE', 'SHARE', 'DELETE'],
      id: 'aaa1eea5-ff18-4f01-9282-2cf57038cc50',
      name: 'QA',
    },
  ];

  beforeEach(() => {
    group.Group.findAll.mockClear();
    group.Group.findOne.mockClear();
  });

  it('should return groups array', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();
    group.Group.findAll.mockImplementation(() => Promise.resolve(groups));
    await GroupService.getGroups(req as any, res as any, next);
    expect(res.send).toBeCalledWith(groups);
  });

  it('should return group with ID', async () => {
    const req = {
      params: { id: 'aaa1eea5-ff18-4f01-9282-2cf57038cc50' }, //groups[2]
    };
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();
    group.Group.findOne.mockImplementation((arg: { where: { id: string } }) =>
      Promise.resolve(groups.find((group) => group.id === arg.where.id)),
    );
    await GroupService.getGroupById(req as any, res as any, next);
    expect(res.send).toBeCalledWith(groups[2]);
  });

  it('should return not-found if there is no group with ID', async () => {
    const req = {
      params: { id: 'fake id' },
    };
    const res = {
      send: jest.fn(),
      error: new HttpError(404, { message: 'Group is not found' }),
    };

    const next = jest.fn();
    group.Group.findOne.mockImplementation((arg: { where: { id: string } }) =>
      Promise.resolve(groups.find((group) => group.id === arg.where.id)),
    );
    await GroupService.getGroupById(req as any, res as any, next);
    expect(next).toBeCalledWith({
      ...res.error,
      module: 'GroupService',
      method: 'getGroupById',
    });
  });
});
