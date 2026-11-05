import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScenarioApp from '../../../src/components/scenarios/ScenarioApp';
import { SCENARIOS, nextScenario, scenarioById } from '../../../src/content/scenarios';

export function generateStaticParams() {
  return SCENARIOS.map((scenario) => ({ id: scenario.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const scenario = scenarioById(id);
  if (!scenario) return { title: 'Không tìm thấy kịch bản | Chọn đường' };
  return {
    title: `${scenario.title} | Chọn đường`,
    description: scenario.brief.slice(0, 160),
  };
}

export default async function ScenarioPage({ params }) {
  const { id } = await params;
  const scenario = scenarioById(id);
  if (!scenario) notFound();

  return (
    <>
      <div className="crumb no-print">
        <Link href="/kich-ban">← Hai kịch bản</Link>
      </div>
      <ScenarioApp scenario={scenario} next={nextScenario(scenario.id)} />
    </>
  );
}
