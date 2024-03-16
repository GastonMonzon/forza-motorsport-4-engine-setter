import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';

export default function App() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCards, setFilteredCars] = useState([]);
  const [isManufacturerAsc, setIsManufacturerAsc] = useState('▲');
  const [isModelAsc, setIsModelAsc] = useState('');
  const [isYearAsc, setIsYearAsc] = useState('');
  const [isEngineAsc, setIsEngineAsc] = useState('');
  const [isDispAsc, setIsDispAsc] = useState('');
  const [isAspAsc, setIsAspAsc] = useState('');
  const [isPowerAsc, setIsPowerAsc] = useState('');
  const [isTorqueAsc, setIsTorqueAsc] = useState('');
  const [manufacturerSearch, setManufacturerSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [yearSearch, setYearSearch] = useState('');
  const [engineSearch, setEngineSearch] = useState('');
  const [dispSearch, setDispSearch] = useState('');
  const [aspSearch, setAspSearch] = useState('');
  const [powerSearch, setPowerSearch] = useState('');
  const [torqueSearch, setTorqueSearch] = useState('');
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedEngineCars, setSelectedEngineCars] = useState([]);
  const [selectedCarEngines, setSelectedCarEngines] = useState([]);
  const [isAddEngineOpen, setIsAddEngineOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [statusBarClassName, setStatusBarClassName] = useState('status-bar');
  const [modifiedCars, setModifiedCars] = useState([]);
  const [addedEngines, setAddedEngines] = useState([]);

  useEffect(() => {
    (async function fetchCars() {
      try {
        const { data } = await axios('https://forza-motorsport-4-engine-setter-production.up.railway.app/cars');
        setAllCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error('Error retrieving cars:', error);
      }
    })();
  }, []);

  const handleSelectEngine = async (car) => {
    if (selectedEngine !== null && selectedEngine.Id === car.Id) {
      setSelectedEngine(null);
      setSelectedEngineCars([]);
    } else {
      setSelectedEngine(car);
      try {
        const { data } = await axios.post('https://forza-motorsport-4-engine-setter-production.up.railway.app/cars/checkEngines', { car });
        setSelectedEngineCars(data);
      } catch (error) {
        console.error('Error checking cars:', error);
      }
    }
  }
  const handleSelectCar = async (car) => {
    if (selectedCar !== null && selectedCar.Id === car.Id) {
      setSelectedCar(null);
      setSelectedCarEngines([]);
    } else {
      setSelectedCar(car);
      try {
        const { data } = await axios.post('https://forza-motorsport-4-engine-setter-production.up.railway.app/cars/checkCars', { car });
        setSelectedCarEngines(data);
      } catch (error) {
        console.error('Error checking cars:', error);
      }
    }
  }
  const openAddEngineModal = () => {
    setIsAddEngineOpen(true);
  }
  const openSubmitModal = () => {
    setIsSubmitOpen(true);
  }
  const handlePostEngine = async () => {
    try {
      await axios.post(`https://forza-motorsport-4-engine-setter-production.up.railway.app/cars/addEngine`, { selectedEngine, selectedCar });
      setModifiedCars(prevModifiedCars => [...prevModifiedCars, selectedCar]);
      setAddedEngines(prevAddedEngines => [...prevAddedEngines, selectedEngine]);
      setStatusBarClassName('status-bar show');
      setTimeout(function () {
        setStatusBarClassName('status-bar');
      }, 6000);
      setSelectedEngine(null);
      setSelectedCar(null);
      setSelectedEngineCars([]);
      setSelectedCarEngines([]);
      closeAddEngineModal();
    } catch (error) {
      console.error(error);
    }
  }
  const closeAddEngineModal = () => {
    setIsAddEngineOpen(false);
  }
  const closeSubmitModal = () => {
    setIsSubmitOpen(false);
  }
  const handleSubmitDatabases = async () => {
    try {
      await axios.post('https://forza-motorsport-4-engine-setter-production.up.railway.app/cars/postDatabases', { modifiedCars });
    } catch (error) {
      console.error('Error checking cars:', error);
    } finally {
      setModifiedCars([]);
      setAddedEngines([]);
      closeSubmitModal();
    }
  }
  const handleOrderChange = (id) => {
    let orderedAllCars = [...filteredCards];
    let orderedCars = [...filteredCards];
    switch (id) {
      case 'manufacturer':
        if (isManufacturerAsc === '▲') {
          setIsManufacturerAsc('▼');
        } else {
          setIsManufacturerAsc('▲');
        }
        setIsModelAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.FullName.localeCompare(b.FullName);
          return isManufacturerAsc === '▲' ? -comparison : comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.FullName.localeCompare(b.FullName);
          return isManufacturerAsc === '▲' ? -comparison : comparison;
        });
        break;
      case 'model':
        if (isModelAsc === '▲') {
          setIsModelAsc('▼');
        } else {
          setIsModelAsc('▲');
        }
        setIsManufacturerAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Model.localeCompare(b.Model);
          return isModelAsc === '▲' ? -comparison : comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Model.localeCompare(b.Model);
          return isModelAsc === '▲' ? -comparison : comparison;
        });
        break;
      case 'year':
        if (isYearAsc === '▼') {
          setIsYearAsc('▲');
        } else {
          setIsYearAsc('▼');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Year - b.Year;
          return isYearAsc === '▼' ? comparison : -comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Year - b.Year;
          return isYearAsc === '▼' ? comparison : -comparison;
        });
        break;
      case 'engineType':
        if (isEngineAsc === '▲') {
          setIsEngineAsc('▼');
        } else {
          setIsEngineAsc('▲');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsYearAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.EngineType.localeCompare(b.EngineType);
          return isEngineAsc === '▲' ? -comparison : comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.EngineType.localeCompare(b.EngineType);
          return isEngineAsc === '▲' ? -comparison : comparison;
        });
        break;
      case 'displacement':
        if (isDispAsc === '▲') {
          setIsDispAsc('▼');
        } else {
          setIsDispAsc('▲');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Displacement - b.Displacement;
          return isPowerAsc === '▼' ? comparison : -comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Displacement - b.Displacement;
          return isPowerAsc === '▼' ? comparison : -comparison;
        });
        break;
      case 'aspiration':
        if (isAspAsc === '▲') {
          setIsAspAsc('▼');
        } else {
          setIsAspAsc('▲');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsPowerAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Aspiration.localeCompare(b.Aspiration);
          return isAspAsc === '▲' ? -comparison : comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Aspiration.localeCompare(b.Aspiration);
          return isAspAsc === '▲' ? -comparison : comparison;
        });
        break;
      case 'power':
        if (isPowerAsc === '▼') {
          setIsPowerAsc('▲');
        } else {
          setIsPowerAsc('▼');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsTorqueAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Power - b.Power;
          return isPowerAsc === '▼' ? comparison : -comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Power - b.Power;
          return isPowerAsc === '▼' ? comparison : -comparison;
        });
        break;
      case 'torque':
        if (isTorqueAsc === '▼') {
          setIsTorqueAsc('▲');
        } else {
          setIsTorqueAsc('▼');
        }
        setIsManufacturerAsc('');
        setIsModelAsc('');
        setIsYearAsc('');
        setIsEngineAsc('');
        setIsDispAsc('');
        setIsAspAsc('');
        setIsPowerAsc('');
        orderedCars.sort((a, b) => {
          const comparison = a.Torque - b.Torque;
          return isTorqueAsc === '▼' ? comparison : -comparison;
        });
        orderedAllCars.sort((a, b) => {
          const comparison = a.Torque - b.Torque;
          return isTorqueAsc === '▼' ? comparison : -comparison;
        });
        break;
      default:
        break;
    }
    setFilteredCars(orderedCars);
    setAllCars(orderedAllCars);
  }
  const handleSearch = (event) => {
    let { id, value } = event.target;
    value = value.toLowerCase();
    switch (id) {
      case 'manufacturerSearch':
        setManufacturerSearch(value);
        break;
      case 'modelSearch':
        setModelSearch(value);
        break;
      case 'yearSearch':
        setYearSearch(value);
        break;
      case 'engineSearch':
        setEngineSearch(value);
        break;
      case 'dispSearch':
        setDispSearch(value);
        break;
      case 'aspSearch':
        setAspSearch(value);
        break;
      case 'powerSearch':
        setPowerSearch(value);
        break;
      case 'torqueSearch':
        setTorqueSearch(value);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    const carsTemp = allCars.filter((car) => {
      return (
        car.Manufacturer.toLowerCase().includes(manufacturerSearch) &&
        car.Model.toLowerCase().includes(modelSearch) &&
        car.Year.toString().includes(yearSearch) &&
        car.EngineType.toLowerCase().includes(engineSearch) &&
        car.Displacement.toString().includes(dispSearch) &&
        car.Aspiration.toLowerCase().includes(aspSearch) &&
        car.Power.toString().includes(powerSearch) &&
        car.Torque.toString().includes(torqueSearch)
      );
    });
    setFilteredCars(carsTemp);
  }, [manufacturerSearch, modelSearch, yearSearch, engineSearch, dispSearch, aspSearch, powerSearch, torqueSearch]);

  return (
    <div id='main-container' >
      <table className='main-table' >
        <thead>
          <tr className='heading' >
            <td>
              <button
                id='manufacturer'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Make {isManufacturerAsc}
              </button>
            </td>
            <td>
              <button
                id='model'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Model {isModelAsc}
              </button>
            </td>
            <td>
              <button
                id='year'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Year {isYearAsc}
              </button>
            </td>
            <td>
              <button
                id='engineType'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Type {isEngineAsc}
              </button>
            </td>
            <td>
              <button
                id='displacement'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Lt {isDispAsc}
              </button>
            </td>
            <td>
              <button
                id='aspiration'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Asp {isAspAsc}
              </button>
            </td>
            <td>
              <button
                id='power'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Hp {isPowerAsc}
              </button>
            </td>
            <td>
              <button
                id='torque'
                onClick={(event) => handleOrderChange(event.target.id)} >
                Lb-ft {isTorqueAsc}
              </button>
            </td>
            <td className='no-hover-button' >
              <button>Selected Engine</button>
            </td>
            <td className='no-hover-button' >
              <button>Selected Car</button>
            </td>
          </tr>
          <tr className='search-bar' >
            <td>
              <input type='search'
                id='manufacturerSearch'
                className='manufacturer-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='modelSearch'
                value={modelSearch}
                className='model-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='yearSearch'
                value={yearSearch}
                className='year-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='engineSearch'
                value={engineSearch}
                className='engine-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='dispSearch'
                value={dispSearch}
                className='disp-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='aspSearch'
                value={aspSearch}
                className='asp-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='powerSearch'
                value={powerSearch}
                className='power-search'
                onChange={handleSearch}
              />
            </td>
            <td>
              <input type='search'
                id='torqueSearch'
                value={torqueSearch}
                className='torque-search'
                onChange={handleSearch}
              />
            </td>
            <td className='selected-engine-td' >
              <p>{selectedEngine && (`${selectedEngine.EngineType} ${selectedEngine.Manufacturer} ${selectedEngine.Model} '${selectedEngine.Year.toString().slice(-2)}`)}</p>
            </td>
            <td className='selected-car-td' >
              <p>{selectedCar && (`${selectedCar.Manufacturer} ${selectedCar.Model} '${selectedCar.Year.toString().slice(-2)}`)}</p>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredCards.map((car, index) => (
            <tr key={car.Id} className={`${index % 2 === 0 ? 'even' : 'odd'} ${(car.Id === (selectedEngine && selectedEngine.Id) || car.Id === (selectedCar && selectedCar.Id)) ? 'selected-tr' : ''}`} >
              <td>
                <p>{car.Manufacturer}</p>
              </td>
              <td>
                <p>{car.Model}</p>
              </td>
              <td className='align-center' >
                <p>{car.Year}</p>
              </td>
              <td className='align-right' >
                <p>{car.EngineType}</p>
              </td>
              <td className='align-center' >
                <p>{(car.Displacement).toFixed(1)}</p>
              </td>
              <td className='align-center' >
                <p>{car.Aspiration}</p>
              </td>
              <td className='align-right'>
                <p>{car.Power}</p>
              </td>
              <td className='align-right' >
                <p>{car.Torque}</p>
              </td>
              <td>
                <button
                  className={`${selectedEngine && selectedEngine.Id === car.Id
                    ? 'selected'
                    : selectedCar && selectedCar.Id === car.Id
                      ? 'already-set'
                      : selectedCarEngines.some(engine => engine.EngineID === car.EngineID)
                        ? 'already-set'
                        : ''} select-engine-button`}
                  onClick={() => handleSelectEngine(car)}
                  disabled={selectedCar && selectedCar.Id === car.Id || selectedCarEngines.some(engine => engine.EngineID === car.EngineID)} >
                  {selectedEngine && selectedEngine.Id === car.Id
                    ? 'Selected'
                    : selectedCar && selectedCar.Id === car.Id
                      ? 'Stock'
                      : selectedCarEngines.some(engine => engine.EngineID === car.EngineID)
                        ? 'Already Set'
                        : 'Select Engine'}
                </button>
              </td>
              <td>
                <button
                  className={`${car.Id === (selectedCar && selectedCar.Id)
                    ? 'selected'
                    : selectedEngine && selectedEngine.Id === car.Id
                      ? 'already-set'
                      : selectedEngineCars.some(cars => cars.Ordinal === car.Id)
                        ? 'already-set'
                        : ''} select-car-button`}
                  onClick={() => handleSelectCar(car)}
                  disabled={selectedEngine && selectedEngine.Id === car.Id || selectedEngineCars.some(cars => cars.Ordinal === car.Id)} >
                  {selectedCar && selectedCar.Id === car.Id
                    ? 'Selected'
                    : selectedEngine && selectedEngine.Id === car.Id
                      ? 'Stock'
                      : selectedEngineCars.some(cars => cars.Ordinal === car.Id)
                        ? 'Already Set'
                        : 'Select Car'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='add-button'
        onClick={openAddEngineModal}
        disabled={!selectedCar || !selectedEngine} >
        Add Engine
      </button>
      <button
        className='submit-button'
        onClick={openSubmitModal}
        disabled={modifiedCars.length === 0} >
        Submit
      </button>
      {isAddEngineOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-content'>
              <h3>Add To</h3>
              <br />
              <table className='modal-info-table' >
                <thead>
                  <tr>
                    <td></td>
                    <td className='align-right' >{selectedCar.FullName}</td>
                    <td className='align-right' >{selectedEngine.FullName}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='align-left' >Year</td>
                    <td className='align-right' >{`'${selectedCar.Year.toString().slice(-2)}`}</td>
                    <td className='align-right' >
                      <span className='green' >{selectedEngine.Year > selectedCar.Year ? '▲' : ''}</span>
                      <span className='red' >{selectedCar.Year > selectedEngine.Year ? '▼' : ''}</span>
                      <span>{selectedCar.Year === selectedEngine.Year ? '=' : ''}</span>
                      <span>{'\u00A0'}{'\u00A0'}{`'${selectedEngine.Year.toString().slice(-2)}`}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='align-left' >Type</td>
                    <td className='align-right' >{selectedCar.EngineType}</td>
                    <td className='align-right' >
                      <span className='green' >{parseInt(selectedEngine.EngineType.match(/\d+/)[0]) > parseInt(selectedCar.EngineType.match(/\d+/)[0]) ? '▲' : ''}</span>
                      <span className='red' >{parseInt(selectedCar.EngineType.match(/\d+/)[0]) > parseInt(selectedEngine.EngineType.match(/\d+/)[0]) ? '▼' : ''}</span>
                      <span>{selectedCar.EngineType !== selectedEngine.EngineType && parseInt(selectedCar.EngineType.match(/\d+/)[0]) === parseInt(selectedEngine.EngineType.match(/\d+/)[0]) ? '~' : ''}</span>
                      <span>{selectedCar.EngineType === selectedEngine.EngineType ? '=' : ''}</span>
                      <span>{'\u00A0'}{'\u00A0'}{selectedEngine.EngineType}</span></td>
                  </tr>
                  <tr>
                    <td className='align-left'>Disp Lt</td>
                    <td className='align-right'>{selectedCar.Displacement.toFixed(1)}</td>
                    <td className='align-right'>
                      <span className='green' >{selectedEngine.Displacement > selectedCar.Displacement ? '▲' : ''}</span>
                      <span className='red' >{selectedCar.Displacement > selectedEngine.Displacement ? '▼' : ''}</span>
                      <span>{selectedCar.Displacement === selectedEngine.Displacement ? '=' : ''}</span>
                      <span>{'\u00A0'}{'\u00A0'}{selectedEngine.Displacement.toFixed(1)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='align-left' >Asp</td>
                    <td className='align-right' >{selectedCar.Aspiration}</td>
                    <td className='align-right' >
                      <span className='green' >{selectedCar.Aspiration === 'NA' && selectedEngine.Aspiration !== 'NA' ? '▲' : ''}</span>
                      <span className='red' >{selectedEngine.Aspiration === 'NA' && selectedCar.Aspiration !== 'NA' ? '▼' : ''}</span>
                      <span>{selectedCar.Aspiration !== 'NA' && selectedEngine.Aspiration !== 'NA' && selectedCar.Aspiration !== selectedEngine.Aspiration ? '~' : ''}</span>
                      <span>{selectedCar.Aspiration === selectedEngine.Aspiration ? '=' : ''}</span>
                      <span>{'\u00A0'}{'\u00A0'}{selectedEngine.Aspiration}</span></td>
                  </tr>
                  <tr>
                    <td className='align-left' >Power Hp</td>
                    <td className='align-right' >{selectedCar.Power}</td>
                    <td className='align-right' >
                      <span className='green' >{selectedEngine.Power > selectedCar.Power ? '▲' : ''}</span>
                      <span className='red' >{selectedCar.Power > selectedEngine.Power ? '▼' : ''}</span>
                      <span>{selectedCar.Power === selectedEngine.Power ? '=' : ''}</span>
                      <span> {selectedEngine.Power}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='align-left' >Torque Lb-ft</td>
                    <td className='align-right' >{selectedCar.Torque}</td>
                    <td className='align-right' >
                      <span className='green' >{selectedEngine.Torque > selectedCar.Torque ? '▲' : ''}</span>
                      <span className='red' >{selectedCar.Torque > selectedEngine.Torque ? '▼' : ''}</span>
                      <span>{selectedCar.Torque === selectedEngine.Torque ? '=' : ''}</span>
                      <span> {selectedEngine.Torque}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div className='modal-buttons-container' >
                <button className='confirm-button' onClick={handlePostEngine}>Confirm</button>
                <p>-</p>
                <button className='cancel-button' onClick={closeAddEngineModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSubmitOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-content'>
              <h3>Submit Changes</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>Cars</h3>
                      <ul>
                        {modifiedCars.length > 0 &&
                          modifiedCars.map((car, index) => (
                            <li key={index}>{car.FullName} {`'${car.Year.toString().slice(-2)}`}</li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      <h3>Engines</h3>
                      <ul>
                        {addedEngines.length > 0 &&
                          addedEngines.map((engine, index) => (
                            <li key={index}>{engine.EngineName}</li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      <h3>Source</h3>
                      <ul>
                        {modifiedCars.length > 0 &&
                          modifiedCars.map((car, index) => (
                            <li key={index}>{car.Source}</li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div className='modal-buttons-container' >
                <button className='confirm-button' onClick={handleSubmitDatabases}>Confirm</button>
                <p>-</p>
                <button className='cancel-button' onClick={closeSubmitModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br /><br /><br />
      <div className={statusBarClassName}>
        <p>{`Engine ${addedEngines.length > 0 && addedEngines[addedEngines.length - 1].EngineName} successfully added to ${modifiedCars.length > 0 && modifiedCars[modifiedCars.length - 1].FullName} for ${modifiedCars.length > 0 && modifiedCars[modifiedCars.length - 1].Source}`}</p>
      </div>
    </div>
  )
}