import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const NewsletterSignupSection = () => {
  return (
    <div className="grid grid-cols-2 mx-[var(--header-horizontial-padding)] bg-[var(--primary)] p-8 mb-16">
      <div>
        <h1 className="font-bold text-2xl">ĐĂNG KÝ NHẬN ƯU ĐÃI NGAY</h1>
        <p className="text-[0.9rem]">
          Để lại email bạn sẽ biết thêm về các ưu đãi đặc biệt và hơn thế nữa!
        </p>
      </div>
      <div className="flex gap-4">
        <Input placeholder="Email của bạn..." className="focus-visible:ring-0 border-white" />
        <Button className="bg-[var(--background)] cursor-pointer hover:opacity-85">Đăng ký</Button>
      </div>
    </div>
  )
}

export default NewsletterSignupSection
