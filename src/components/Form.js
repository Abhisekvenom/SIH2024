import React, { useState } from 'react';
import './CarbonFootprintCalculator.css';
import MyLineChart from './MyLineChart';
import MyBarChart from './MyBarChart';
import MyPieChart from './MyPieChart';
import MyTable from './MyTable';
import CarbonFootprintForm from './CarbonFootprintForm';

const CarbonFootprintCalculator = () => {
  const [energyConsumption, setEnergyConsumption] = useState('');
  const [fuelUsage, setFuelUsage] = useState('');
  const [methaneEmissions, setMethaneEmissions] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateCarbonFootprint = (energyConsumption, fuelUsage, methaneEmissions) => {
    const energyConversionFactor = 0.62; // kg CO2e/kWh
    const fuelConversionFactor = 2.76; // kg CO2e/liter
    const methaneConversionFactor = 28; // kg CO2e/kg methane

    const energyEmissions = energyConsumption * energyConversionFactor;
    const fuelEmissions = fuelUsage * fuelConversionFactor;
    const methaneEmissionsCO2e = methaneEmissions * methaneConversionFactor;

    return energyEmissions + fuelEmissions + methaneEmissionsCO2e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const energy = parseFloat(energyConsumption);
    const fuel = parseFloat(fuelUsage);
    const methane = parseFloat(methaneEmissions);

    if (isNaN(energy) || isNaN(fuel) || isNaN(methane)) {
      setError('Please enter valid numbers for all fields.');
      setResult('');
      return;
    }

    const carbonFootprint = calculateCarbonFootprint(energy, fuel, methane);
    setResult(`Your carbon footprint is: ${carbonFootprint.toFixed(2)} kg CO2e`);
    setError('');
  };

  // Data for visualization
  const data = [
    { name: 'Energy Consumption', value: parseFloat(energyConsumption) || 0 },
    { name: 'Fuel Usage', value: parseFloat(fuelUsage) || 0 },
    { name: 'Methane Emissions', value: parseFloat(methaneEmissions) || 0 },
  ];

  return (
    <div className="calculator-container">
      <h1>Carbon Footprint Calculator</h1>
      <CarbonFootprintForm 
        energyConsumption={energyConsumption} 
        setEnergyConsumption={setEnergyConsumption}
        fuelUsage={fuelUsage} 
        setFuelUsage={setFuelUsage}
        methaneEmissions={methaneEmissions}
        setMethaneEmissions={setMethaneEmissions}
        handleSubmit={handleSubmit}
        error={error}
      />
      {result && <div className="result">{result}</div>}

      {/* Visualization components in a grid layout */}
      <div className="visualizations">
        <section>
          <h2>Line Chart</h2>
          <MyLineChart data={data} />
        </section>
        <section>
          <h2>Bar Chart</h2>
          <MyBarChart data={data} />
        </section>
        <section>
          <h2>Pie Chart</h2>
          <MyPieChart data={data} />
        </section>
        <div className="table-container">
          <h2>Detailed Data</h2>
          <MyTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
