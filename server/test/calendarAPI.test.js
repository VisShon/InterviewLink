const { getSlots, setSlot } = require('../controllers/SlotsController'); 
const { v4: uuidv4 } = require('uuid');
jest.mock('uuid');


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

    // Assert the result 
    expect(slots).toBeDefined()
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
    uuidv4.mockImplementation(() => 'testid');

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
            requestId: 'testid',
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    });
  });
});
