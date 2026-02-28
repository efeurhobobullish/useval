import { NewAccount, ExistingAccount } from "@/components/auth"  
import { Heart } from "iconsax-reactjs"  
import { useEffect, useState } from "react"  
  
const avatars = [  
  "Gift Jacksun",  
  "Empire Tech",  
  "Amaka Bello",  
  "Tunde Ajayi",  
  "Sarah Kim", 
]  
  
export default function Auth() {  
  const [activeTab, setActiveTab] = useState("new")  
  const [count, setCount] = useState(0)  
  
  const target = 21  
  
  useEffect(() => {  
    if (count >= target) return  
  
    const timer = setTimeout(() => {  
      setCount((prev) => prev + 1)  
    }, 60)  
  
    return () => clearTimeout(timer)  
  }, [count])  
  
  const tabs = [  
    { id: "new", label: "New" },  
    { id: "existing", label: "Existing" },  
  ]  
  
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex flex-col items-center pt-24 sm:pt-32 md:pt-40">
      <div className="bg-white relative rounded-t-[32px] sm:rounded-t-[40px] px-4 w-full max-w-[480px] flex-1">
        <div className="center h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Heart variant="Bulk" size={80} className="text-primary sm:w-[100px] sm:h-[100px] w-20 h-20" />
        </div>

        <div className="pt-16 sm:pt-20 space-y-4 sm:space-y-6 pb-8">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-center border border-line/70 px-3 sm:px-4 text-xs sm:text-sm w-fit bg-secondary mx-auto py-1.5 rounded-lg text-gray-500">
              The best way to find love a valentine
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-center text-main">
              Welcome to Useval
            </h1>

            <p className="text-muted text-xs sm:text-sm text-center px-1">
              Build and share Valentine cards, send real airtime gifts, and track
              responses in one place
            </p>
          </div>
  
          <div className="flex flex-col items-center gap-2 mt-3">  
            <div className="flex -space-x-3">  
              {avatars.map((name, i) => (  
                <img  
                  key={i}  
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}  
                  alt={name}  
                  className="h-9 w-9 rounded-full border-4 border-white"  
                />  
              ))}  
            </div>  
  
            <p className="text-xs text-muted">  
              {count}+ people already sent Valentine gifts  
            </p>  
          </div>  
  
          <div className="min-h-[400px] sm:min-h-[500px]">
            <div className="border border-line rounded-2xl p-3 sm:p-4 space-y-4 sm:space-y-6 mb-6 sm:mb-10">
              <div className="flex gap-2 bg-secondary rounded-xl p-1.5 sm:p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex-1 min-w-0 ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "new" ? <NewAccount /> : <ExistingAccount />}
            </div>
          </div>
        </div>  
      </div>  
    </div>  
  )  
}
