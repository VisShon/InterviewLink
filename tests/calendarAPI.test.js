const { getSlots, setSlot } = require('./calendar'); // Adjust the path based on your file structure

// Mock the Google API calls for testing purposes
jest.mock('googleapis');
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  addWeeks: jest.fn(),
}));

describe('Calendar functions', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('getSlots function', async () => {
    // Mock the Google API response
    const mockEventsList = jest.fn().mockResolvedValue({
      data: {
        items: [
          {
            id: 'mockEventId',
            start: { dateTime: '2023-11-01T10:00:00Z' },
            end: { dateTime: '2023-11-01T11:00:00Z' },
          },
        ],
      },
    });

    const mockGoogleCalendar = {
      events: {
        list: mockEventsList,
      },
    };

    require('googleapis').google.calendar.mockImplementation(() => mockGoogleCalendar);

    // Mock date-fns functions
    require('date-fns').addWeeks.mockReturnValue(new Date('2023-11-08T00:00:00Z'));

    const slots = await getSlots('mockCalendarId', 'mockInterviewerId');

    // Assert the result based on the mock data
    expect(slots).toEqual([
      {
        id: 0,
        calendarId: 'mockCalendarId',
        interviewerStatus: 'Available',
        start: '12:00:00 AM', 
        end: '12:30:00 AM',
        day: 'Monday',
        timestampStart: '2023-11-01T00:00:00.000Z',
        timestampEnd: '2023-11-01T00:30:00.000Z',
      },
    ]);
  });

  test('setSlot function', async () => {
    // Mock the Google API response
    const mockEventsInsert = jest.fn().mockResolvedValue({
      data: {
        id: 'mockEventId',
        start: { dateTime: '2023-11-01T10:00:00Z' },
        end: { dateTime: '2023-11-01T11:00:00Z' },
      },
    });

    const mockGoogleCalendar = {
      events: {
        insert: mockEventsInsert,
      },
    };

    require('googleapis').google.calendar.mockImplementation(() => mockGoogleCalendar);

    // Mock uuidv4 function
    jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('mockUUID') }));

    const start = '2023-11-01T10:00:00Z';
    const end = '2023-11-01T11:00:00Z';
    await setSlot('mockCalendarId', start, end);

    // Assert the Google API call
    expect(mockEventsInsert).toHaveBeenCalledWith({
      sendUpdates: 'all',
      calendarId: 'mockCalendarId',
      resource: {
        description: 'Mathworks Interview',
        summary: 'Mathworks Interview',
        start: {
          dateTime: start,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: end,
          timeZone: 'Asia/Kolkata',
        },
        conferenceData: {
          createRequest: {
            requestId: 'mockUUID',
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    });
  });
});
