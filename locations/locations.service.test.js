const locationsService = require('./locations.service')
const Location = require('../locations.model')

jest.mock('./location.model')

describe('Locations FindAll', () => {
    it('Should call model find', async () =>{
        Location.find.mockResolvedValue([1,2,3,4])
        expect(await locationsService.getAll()).toEqual([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Location FindOne', () => {
    jest.resetAllMocks()
    it('Should get a user', async () => {
        const mockLocation = { _id: '', filmName: 'Jiji la crevette'}
        Location.getById.mockResolvedValue(mockLocation)
        expect(async() => await locationsService.getById(''))
        expect(Location.getById).toHaveBeenCalledTimes(1)
    })
})

