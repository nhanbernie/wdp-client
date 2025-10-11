import Banner from './Banner'
import CategoryShowcase from './CategoryShowcase'
import Features from './Features'
import LatestProductSection from './LatestProductSection'
import NewsletterSignupSection from './NewsletterSignupSection'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <LatestProductSection />
      <CategoryShowcase />
      <Features />
      <NewsletterSignupSection />
    </div>
  )
}

export default HomePage
