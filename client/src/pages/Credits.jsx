import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Credits = () => {

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const {token, axios} = useAppContext();

  const fetchPlans = async () => {
    try {
      const {data} = await axios.get('/api/credit/plan', {headers: {Authorization: token}})

      if(data.success){
        setPlans(data.plans)
      }else{
        toast.error(data.message || "Failed to fetch plans")
      }
    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false)
  }

  const purchasePlan = async(planId) => {
    try {
      console.log(planId)
      const {data} = await axios.post('/api/credit/purchase', {planId}, {headers: {Authorization: token}})
       console.log("Purchase response: ", data)
      if(data.success){
        window.location.href = data.url;
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) {
    return <div className='w-full h-full flex items-center justify-center'>
      <span className="loading loading-spinner loading-xl text-primary"></span>
    </div>
  }

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2  className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-primary-800 '>Credit Plans</h2>

      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((plan)=>(
          <div key={plan._id} className={`border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-75 flex flex-col ${plan._id === "pro" ? "bg-primary/30 " : ""}`}>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold  mb-2'>{plan.name}</h3>
              <p className='text-2xl font-bold mb-4'>${plan.price} <span className='text-base font-normal'>{' '}/ {plan.credits} credits</span></p>
              <ul className='list-disc list-inside text-sm space-y-1'>
                {plan.features.map((feature, index) => (
                  <li key={index} >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className='mt-6 btn font-medium py-2 rounded transition-colors cursor-pointer btn-primary' onClick={()=>toast.promise(purchasePlan(plan._id), {loading: "Processing the purchase..."})}>
                Buy Now
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Credits