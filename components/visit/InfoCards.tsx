import { hoursTable } from "@/lib/data/hours";
import { addressLines, siteConfig } from "@/lib/site";

export function InfoCards() {
  return (
    <div className="info-cards">
      <div className="info">
        <h3>Address</h3>
        <p>
          {addressLines[0]}
          <br />
          {addressLines[1]}
        </p>
        <a className="link" href={siteConfig.directionsUrl} target="_blank" rel="noopener noreferrer">
          Get directions →
        </a>
      </div>
      <div className="info">
        <h3>Call or email</h3>
        <p>
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          <br />
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
        <p className="small">Front desk answers 24 hours a day.</p>
      </div>
      <div className="info">
        <h3>Hours</h3>
        <table className="hours">
          <tbody>
            {hoursTable.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="info">
        <h3>Getting here</h3>
        <p>
          15 minutes from San Diego International by car. The #2 and #7 buses stop at University
          &amp; 30th, a two-minute walk. Bike racks by the Loggia gate.
        </p>
      </div>
    </div>
  );
}
