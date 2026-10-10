import LandingPage, { landingMetadata } from '../landing';
import { landing } from '../landings';

const l = landing('upakovka');
export const metadata = landingMetadata(l);

export default function Page() {
  return <LandingPage l={l} />;
}
