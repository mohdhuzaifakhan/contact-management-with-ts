import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';

function Map() {
    const userData = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return fetch('https://disease.sh/v3/covid-19/countries').then(response => response.json());
        }
    });

    return (
        <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userData.isFetching && (
                <div>Fetching data...</div>
            )}

            {userData.isError && (
                <div>{`Error getting data!!!`}</div>
            )}

            {userData.data && userData.data.map((country: any, index: number) => (
                <Marker key={index} position={[country.countryInfo.lat, country.countryInfo.long]}>
                    <Popup>
                        <div>
                            <h1>{country.country}</h1>
                            <p>Active Cases: {country.active}</p>
                            <p>Recovered Cases: {country.recovered}</p>
                            <p>Death Cases: {country.deaths}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
