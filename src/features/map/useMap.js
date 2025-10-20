import L from "leaflet";

const useMap = () => {
  const createNumberedIcon = (number) =>
    new L.divIcon({
      className: "number-icon",
      html: `<div class="number-circle">${number}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

  return {
    createNumberedIcon,
  };
};

export default useMap;
