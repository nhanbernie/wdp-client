import Banner from './Banner'
import CategoryShowcase from './CategoryShowcase'
import Features from './Features'
import LatestProductSection from './LatestProductSection'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <LatestProductSection />
      <CategoryShowcase />
      <Features />
    </div>
  )
}

export default HomePage
