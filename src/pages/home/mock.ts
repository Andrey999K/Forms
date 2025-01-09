import { Slice, Sort } from '@/types';
import { Card } from '@/types/card';

export const cardsMock: Card[] = [
  {
    id: '0',
    title: 'Item 0',
    createdAt: 1658985652,
    responseCount: 10,
  },
  {
    id: '1',
    title: 'Item 1',
    createdAt: 1658986652,
    responseCount: 11,
  },
  {
    id: '2',
    title: 'Item 2',
    createdAt: 1658987652,
    responseCount: 12,
  },
  {
    id: '3',
    title: 'Item 3',
    createdAt: 1658988652,
    responseCount: 13,
  },
  {
    id: '4',
    title: 'Item 4',
    createdAt: 1658989652,
    responseCount: 14,
  },
  {
    id: '5',
    title: 'Item 5',
    createdAt: 1658990652,
    responseCount: 15,
  },
  {
    id: '6',
    title: 'Item 6',
    createdAt: 1658991652,
    responseCount: 16,
  },
  {
    id: '7',
    title: 'Item 7',
    createdAt: 1658992652,
    responseCount: 17,
  },
  {
    id: '8',
    title: 'Item 8',
    createdAt: 1658993652,
    responseCount: 18,
  },
  {
    id: '9',
    title: 'Item 9',
    createdAt: 1658994652,
    responseCount: 19,
  },
  {
    id: '10',
    title: 'Item 10',
    createdAt: 1658995652,
    responseCount: 20,
  },
  {
    id: '11',
    title: 'Item 11',
    createdAt: 1658996652,
    responseCount: 21,
  },
  {
    id: '12',
    title: 'Item 12',
    createdAt: 1658997652,
    responseCount: 22,
  },
  {
    id: '13',
    title: 'Item 13',
    createdAt: 1658998652,
    responseCount: 23,
  },
  {
    id: '14',
    title: 'Item 14',
    createdAt: 1658999652,
    responseCount: 24,
  },
  {
    id: '15',
    title: 'Item 15',
    createdAt: 1659000652,
    responseCount: 25,
  },
  {
    id: '16',
    title: 'Item 16',
    createdAt: 1659001652,
    responseCount: 26,
  },
  {
    id: '17',
    title: 'Item 17',
    createdAt: 1659002652,
    responseCount: 27,
  },
  {
    id: '18',
    title: 'Item 18',
    createdAt: 1659003652,
    responseCount: 28,
  },
  {
    id: '19',
    title: 'Item 19',
    createdAt: 1659004652,
    responseCount: 29,
  },
  {
    id: '20',
    title: 'Item 20',
    createdAt: 1659005652,
    responseCount: 30,
  },
  {
    id: '21',
    title: 'Item 21',
    createdAt: 1659006652,
    responseCount: 31,
  },
  {
    id: '22',
    title: 'Item 22',
    createdAt: 1659007652,
    responseCount: 32,
  },
  {
    id: '23',
    title: 'Item 23',
    createdAt: 1659008652,
    responseCount: 33,
  },
  {
    id: '24',
    title: 'Item 24',
    createdAt: 1659009652,
    responseCount: 34,
  },
  {
    id: '25',
    title: 'Item 25',
    createdAt: 1659010652,
    responseCount: 35,
  },
  {
    id: '26',
    title: 'Item 26',
    createdAt: 1659011652,
    responseCount: 36,
  },
  {
    id: '27',
    title: 'Item 27',
    createdAt: 1659012652,
    responseCount: 37,
  },
  {
    id: '28',
    title: 'Item 28',
    createdAt: 1659013652,
    responseCount: 38,
  },
  {
    id: '29',
    title: 'Item 29',
    createdAt: 1659014652,
    responseCount: 39,
  },
  {
    id: '30',
    title: 'Item 30',
    createdAt: 1659015652,
    responseCount: 40,
  },
  {
    id: '31',
    title: 'Item 31',
    createdAt: 1659016652,
    responseCount: 41,
  },
  {
    id: '32',
    title: 'Item 32',
    createdAt: 1659017652,
    responseCount: 42,
  },
  {
    id: '33',
    title: 'Item 33',
    createdAt: 1659018652,
    responseCount: 43,
  },
  {
    id: '34',
    title: 'Item 34',
    createdAt: 1659019652,
    responseCount: 44,
  },
  {
    id: '35',
    title: 'Item 35',
    createdAt: 1659020652,
    responseCount: 45,
  },
  {
    id: '36',
    title: 'Item 36',
    createdAt: 1659021652,
    responseCount: 46,
  },
  {
    id: '37',
    title: 'Item 37',
    createdAt: 1659022652,
    responseCount: 47,
  },
  {
    id: '38',
    title: 'Item 38',
    createdAt: 1659023652,
    responseCount: 48,
  },
  {
    id: '39',
    title: 'Item 39',
    createdAt: 1659024652,
    responseCount: 49,
  },
  {
    id: '40',
    title: 'Item 40',
    createdAt: 1659025652,
    responseCount: 50,
  },
  {
    id: '41',
    title: 'Item 41',
    createdAt: 1659026652,
    responseCount: 51,
  },
  {
    id: '42',
    title: 'Item 42',
    createdAt: 1659027652,
    responseCount: 52,
  },
  {
    id: '43',
    title: 'Item 43',
    createdAt: 1659028652,
    responseCount: 53,
  },
  {
    id: '44',
    title: 'Item 44',
    createdAt: 1659029652,
    responseCount: 54,
  },
  {
    id: '45',
    title: 'Item 45',
    createdAt: 1659030652,
    responseCount: 55,
  },
  {
    id: '46',
    title: 'Item 46',
    createdAt: 1659031652,
    responseCount: 56,
  },
  {
    id: '47',
    title: 'Item 47',
    createdAt: 1659032652,
    responseCount: 57,
  },
  {
    id: '48',
    title: 'Item 48',
    createdAt: 1659033652,
    responseCount: 58,
  },
  {
    id: '49',
    title: 'Item 49',
    createdAt: 1659034652,
    responseCount: 59,
  },
  {
    id: '50',
    title: 'Item 50',
    createdAt: 1659035652,
    responseCount: 60,
  },
  {
    id: '51',
    title: 'Item 51',
    createdAt: 1659036652,
    responseCount: 61,
  },
  {
    id: '52',
    title: 'Item 52',
    createdAt: 1659037652,
    responseCount: 62,
  },
  {
    id: '53',
    title: 'Item 53',
    createdAt: 1659038652,
    responseCount: 63,
  },
  {
    id: '54',
    title: 'Item 54',
    createdAt: 1659039652,
    responseCount: 64,
  },
  {
    id: '55',
    title: 'Item 55',
    createdAt: 1659040652,
    responseCount: 65,
  },
  {
    id: '56',
    title: 'Item 56',
    createdAt: 1659041652,
    responseCount: 66,
  },
  {
    id: '57',
    title: 'Item 57',
    createdAt: 1659042652,
    responseCount: 67,
  },
  {
    id: '58',
    title: 'Item 58',
    createdAt: 1659043652,
    responseCount: 68,
  },
  {
    id: '59',
    title: 'Item 59',
    createdAt: 1659044652,
    responseCount: 69,
  },
  {
    id: '60',
    title: 'Item 60',
    createdAt: 1659045652,
    responseCount: 70,
  },
  {
    id: '61',
    title: 'Item 61',
    createdAt: 1659046652,
    responseCount: 71,
  },
  {
    id: '62',
    title: 'Item 62',
    createdAt: 1659047652,
    responseCount: 72,
  },
  {
    id: '63',
    title: 'Item 63',
    createdAt: 1659048652,
    responseCount: 73,
  },
  {
    id: '64',
    title: 'Item 64',
    createdAt: 1659049652,
    responseCount: 74,
  },
  {
    id: '65',
    title: 'Item 65',
    createdAt: 1659050652,
    responseCount: 75,
  },
  {
    id: '66',
    title: 'Item 66',
    createdAt: 1659051652,
    responseCount: 76,
  },
  {
    id: '67',
    title: 'Item 67',
    createdAt: 1659052652,
    responseCount: 77,
  },
  {
    id: '68',
    title: 'Item 68',
    createdAt: 1659053652,
    responseCount: 78,
  },
  {
    id: '69',
    title: 'Item 69',
    createdAt: 1659054652,
    responseCount: 79,
  },
  {
    id: '70',
    title: 'Item 70',
    createdAt: 1659055652,
    responseCount: 80,
  },
  {
    id: '71',
    title: 'Item 71',
    createdAt: 1659056652,
    responseCount: 81,
  },
  {
    id: '72',
    title: 'Item 72',
    createdAt: 1659057652,
    responseCount: 82,
  },
  {
    id: '73',
    title: 'Item 73',
    createdAt: 1659058652,
    responseCount: 83,
  },
  {
    id: '74',
    title: 'Item 74',
    createdAt: 1659059652,
    responseCount: 84,
  },
  {
    id: '75',
    title: 'Item 75',
    createdAt: 1659060652,
    responseCount: 85,
  },
  {
    id: '76',
    title: 'Item 76',
    createdAt: 1659061652,
    responseCount: 86,
  },
  {
    id: '77',
    title: 'Item 77',
    createdAt: 1659062652,
    responseCount: 87,
  },
  {
    id: '78',
    title: 'Item 78',
    createdAt: 1659063652,
    responseCount: 88,
  },
  {
    id: '79',
    title: 'Item 79',
    createdAt: 1659064652,
    responseCount: 89,
  },
  {
    id: '80',
    title: 'Item 80',
    createdAt: 1659065652,
    responseCount: 90,
  },
  {
    id: '81',
    title: 'Item 81',
    createdAt: 1659066652,
    responseCount: 91,
  },
  {
    id: '82',
    title: 'Item 82',
    createdAt: 1659067652,
    responseCount: 92,
  },
  {
    id: '83',
    title: 'Item 83',
    createdAt: 1659068652,
    responseCount: 93,
  },
  {
    id: '84',
    title: 'Item 84',
    createdAt: 1659069652,
    responseCount: 94,
  },
  {
    id: '85',
    title: 'Item 85',
    createdAt: 1659070652,
    responseCount: 95,
  },
  {
    id: '86',
    title: 'Item 86',
    createdAt: 1659071652,
    responseCount: 96,
  },
  {
    id: '87',
    title: 'Item 87',
    createdAt: 1659072652,
    responseCount: 97,
  },
  {
    id: '88',
    title: 'Item 88',
    createdAt: 1659073652,
    responseCount: 98,
  },
  {
    id: '89',
    title: 'Item 89',
    createdAt: 1659074652,
    responseCount: 99,
  },
  {
    id: '90',
    title: 'Item 90',
    createdAt: 1659075652,
    responseCount: 100,
  },
  {
    id: '91',
    title: 'Item 91',
    createdAt: 1659076652,
    responseCount: 101,
  },
  {
    id: '92',
    title: 'Item 92',
    createdAt: 1659077652,
    responseCount: 102,
  },
  {
    id: '93',
    title: 'Item 93',
    createdAt: 1659078652,
    responseCount: 103,
  },
  {
    id: '94',
    title: 'Item 94',
    createdAt: 1659079652,
    responseCount: 104,
  },
  {
    id: '95',
    title: 'Item 95',
    createdAt: 1659080652,
    responseCount: 105,
  },
  {
    id: '96',
    title: 'Item 96',
    createdAt: 1659081652,
    responseCount: 106,
  },
  {
    id: '97',
    title: 'Item 97',
    createdAt: 1659082652,
    responseCount: 107,
  },
  {
    id: '98',
    title: 'Item 98',
    createdAt: 1659083652,
    responseCount: 108,
  },
  {
    id: '99',
    title: 'Item 99',
    createdAt: 1659084652,
    responseCount: 109,
  },
];

export const getMockedCard = (
  slice: Slice = { offset: 0, limit: 30 },
  order: Sort = Sort.ASC,
  searchValue: string = ''
): Promise<Card[]> => {
  return new Promise<Card[]>((resolve) => {
    setTimeout(() => {
      let returnedArray = cardsMock;

      returnedArray = [...cardsMock].sort((a, b) => {
        let prev = a;
        let next = b;

        if (order === Sort.DESC) {
          prev = b;
          next = a;
        }

        return new Date(prev.createdAt) > new Date(next.createdAt) ? 1 : -1;
      });

      if (searchValue) {
        returnedArray = returnedArray.filter((item) => item.title.includes(searchValue));
      }

      returnedArray = returnedArray.slice(slice.offset, slice.limit);

      resolve(returnedArray);
    }, 200);
  });
};
