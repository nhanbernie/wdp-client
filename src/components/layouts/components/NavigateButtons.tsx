import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type ButtonItem = {
  text: string
  path: string
}

const NavigateButtons = () => {
  const { theme } = useTheme()
  const router = useRouter()

  const buttonItem: ButtonItem[] = [
    {
      text: 'Danh mục',
      path: '/categories',
    },
    {
      text: 'Báo giá',
      path: '',
    },
  ]

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div>
      {buttonItem.map((item) => {
        return (
          <Button
            key={item.text}
            className={`cursor-pointer font-medium text-[var(--foreground)] hover:text-[var(--primary)] shadow-none`}
            onClick={() => handleNavigate(item.path)}
          >
            {item.text}
          </Button>
        )
      })}
    </div>
  )
}

export default NavigateButtons
