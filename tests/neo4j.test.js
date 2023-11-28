import { logIn, botController } from './server'
import { compare } from 'bcrypt';

// Mock bcrypt.compare function
jest.mock('bcrypt');
const mockCompare = jest.fn();
compare.mockImplementation(mockCompare);

// Mock jwt.sign function
jest.mock('jsonwebtoken');
const mockSign = jest.fn();
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: mockSign,
}));

describe('Server functions', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('logIn function', () => {
    test('should log in admin successfully', async () => {
      // Mock Admin model
      const mockAdmin = {
        find: jest.fn().mockResolvedValue([
          {
            userName: 'adminUser',
            email: 'admin@example.com',
            password: 'hashedAdminPassword',
          },
        ]),
      };

      const result = await logIn({
        email: 'admin@example.com',
        password: 'adminPassword',
      });

      // Assert bcrypt.compare call
      expect(mockCompare).toHaveBeenCalledWith('adminPassword', 'hashedAdminPassword');

      // Assert jwt.sign call
      expect(mockSign).toHaveBeenCalledWith(
        {
          userName: 'adminUser',
          email: 'admin@example.com',
          id: 'NEXT_PUBLIC_ADMIN_ID',
        },
        'mockJwtKey',
        { expiresIn: 2592000 }
      );

      // Assert the result
      expect(result).toEqual('mockJwtToken');
    });

    test('should log in interviewer successfully', async () => {
      // Mock Interviewer model
      const mockInterviewer = {
        find: jest.fn().mockResolvedValue([
          {
            id: 'interviewerId',
            userName: 'interviewerUser',
            email: 'interviewer@example.com',
            password: 'hashedInterviewerPassword',
          },
        ]),
      };

      const result = await logIn({
        email: 'interviewer@example.com',
        password: 'interviewerPassword',
      });

      // Assert bcrypt.compare call
      expect(mockCompare).toHaveBeenCalledWith('interviewerPassword', 'hashedInterviewerPassword');

      // Assert jwt.sign call
      expect(mockSign).toHaveBeenCalledWith(
        {
          id: 'interviewerId',
          userName: 'interviewerUser',
          email: 'interviewer@example.com',
        },
        'mockJwtKey',
        { expiresIn: 2592000 }
      );

      // Assert the result
      expect(result).toEqual('mockJwtToken');
    });

    test('should return USER_NOT_EXISTS for unknown user', async () => {
      // Mock Admin and Interviewer models
      const mockAdmin = {
        find: jest.fn().mockResolvedValue([]),
      };

      const mockInterviewer = {
        find: jest.fn().mockResolvedValue([]),
      };

      const result = await logIn({
        email: 'unknown@example.com',
        password: 'unknownPassword',
      });

      // Assert the result
      expect(result).toEqual('USER_NOT_EXISTS');
    });
  });

  describe('botController function', () => {
    test('should return interview details for existing user', async () => {
      // Mock Interview model
      const mockInterview = {
        find: jest.fn().mockResolvedValue([
          {
            timeStart: '2023-11-01T10:00:00Z',
            timeEnd: '2023-11-01T11:00:00Z',
            interviewer: {
              userName: 'interviewerUser',
              email: 'interviewer@example.com',
            },
            candidate: {
              track: 'Mock Track',
              status: 'Mock Status',
            },
          },
        ]),
      };

      const result = await botController({
        telegram_id: 'mockTelegramId',
      });

      // Assert the result
      expect(result).toEqual({
        telegram_id: 'mockTelegramId',
        time_start: '12:00:00 AM', // Adjust based on your timezone
        time_end: '12:30:00 AM', // Adjust based on your timezone
        track: 'Mock Track',
        interview_status: 'Mock Status',
        interviewer_userName: 'interviewerUser',
        interviewer_email: 'interviewer@example.com',
      });
    });

    test('should return USER_NOT_EXISTS for unknown user', async () => {
      // Mock Interview model
      const mockInterview = {
        find: jest.fn().mockResolvedValue([]),
      };

      const result = await botController({
        telegram_id: 'unknownTelegramId',
      });

      // Assert the result
      expect(result).toEqual('USER_NOT_EXISTS');
    });
  });
});
