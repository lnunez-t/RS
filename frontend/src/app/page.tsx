import HeroSection from './components/home/HeroSection'
import BestsellerSection from './components/home/BestsellerSection'
import EngagementsSection from './components/home/EngagementsSection'
import CollectionsSection from './components/home/CollectionsSection'
import FeedbackSection from './components/home/FeedbackSection'
import InstaPage from './components/home/InstaPage'

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <BestsellerSection />
            <EngagementsSection />
            <CollectionsSection />
            <FeedbackSection />
            <InstaPage />
        </>
    );
}

