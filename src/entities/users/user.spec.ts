import {UserService} from './user.service';
import { HttpError } from '../../utils';


jest.mock('./user.model');


describe('User entity', () => {
    let user: { User: any; };
    beforeAll(async()=> {
        user = await import('./user.model');
    })
    const users = [{
        "id": "9a113628-331a-4566-a230-56aa240a32ce",
        "login": "Asadbek",
        "password": "nodeCourse2023",
        "age": 22,
        "is_deleted": false,
        "createdAt": "2023-02-19T11:14:25.720Z",
        "updatedAt": "2023-02-19T11:14:25.720Z"
    },
    {
        "id": "56ff2598-bc99-4cc8-8d48-fbd8791aa7d5",
        "login": "John McCulster",
        "password": "greatWall2023",
        "age": 46,
        "is_deleted": false,
        "createdAt": "2023-02-19T11:15:14.478Z",
        "updatedAt": "2023-02-19T12:54:52.409Z"
    },
    {
        "id": "3c4c004c-cf02-4eb5-958f-3e87078ee4aa",
        "login": "asad",
        "password": "tower23342323",
        "age": 23,
        "is_deleted": false,
        "createdAt": "2023-04-06T23:48:25.976Z",
        "updatedAt": "2023-04-06T23:48:25.976Z"
    }]


            beforeEach(()=> {
                user.User.findAll.mockClear();
                user.User.findOne.mockClear();
            })

            it('should return users array', async()=> {
                const req = {};
                const res = {
                    send: jest.fn(),
                    status: jest.fn()
                }
                const next = jest.fn();
                user.User.findAll.mockImplementation(()=> Promise.resolve(users));
                await UserService.getUsers(req as any, res as any, next);
                expect(res.send).toBeCalledWith(users);
            })

            it('should return user with ID', async()=> {
                const req = {
                    params: {id: '56ff2598-bc99-4cc8-8d48-fbd8791aa7d5'} //users[1]
                };
                const res = {
                    send: jest.fn(),
                }
                const next = jest.fn();
                user.User.findOne.mockImplementation((arg: {where: {id:string}})=> Promise.resolve(users.find(user => user.id === arg.where.id)));
                await UserService.getUserById(req as any, res as any, next);
                expect(res.send).toBeCalledWith(users[1]);
            })

            it('should return not-found if there is no user with ID', async()=> {
                const req = {
                    params: {id: 'fake id'}
                };
                const res = {
                    send: jest.fn(),
                    error: new HttpError(404, {message: 'User is not found'})
                }
    
                const next = jest.fn();
                user.User.findOne.mockImplementation((arg: {where: {id:string}})=> Promise.resolve(users.find(user => user.id === arg.where.id)));
                await UserService.getUserById(req as any, res as any, next);
                expect(next).toBeCalledWith({...res.error, module: 'UserService', method: 'getUserById'});
            }) 

 })