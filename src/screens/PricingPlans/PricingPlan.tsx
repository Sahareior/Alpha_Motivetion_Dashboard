"use client"

import { useState } from "react"
import Leaderboard from "../Overview/CommonTabel"
import { FiEdit } from "react-icons/fi"
import { FaRegEdit } from "react-icons/fa"
import CommonModal from './../Overview/Modal/CommonModal';
import TableSection from "../Overview/CommonTabel"
import { Toaster, toast } from 'sonner';
import {usePlanUpdateMutation,useSubsPlanListQuery} from '../../../store/slices/apiSlice.js'

interface PricingFeature {
  icon: string
  text: string
}

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonAction: () => void
  isDark?: boolean
  originalName?: string // To track the API name for updates
}

interface ApiPlan {
  name: string
  price: number
}

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [newPrice, setNewPrice] = useState("")
  const [planUpdate] = usePlanUpdateMutation()
  const {data: subsPlan, isLoading, error, refetch} = useSubsPlanListQuery()

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName)
    console.log(`[v0] Subscribing to ${planName}`)
    // Add your subscription logic here
  }

  const handleEditPlan = (plan: PricingPlan) => {
    console.log(plan,'as')
    setEditingPlan(plan)
    setNewPrice(plan.price.replace('$', '')) // Remove $ symbol for editing
    setModalOpen(true)
  }

  const handleSavePlan = async () => {
    if (!editingPlan?.originalName || !newPrice) return

    try {
      const priceValue = parseFloat(newPrice)
      if (isNaN(priceValue)) {
        alert("Please enter a valid price")
        return
      }

      const updateData = {
        price: priceValue
      }

      // Call the update API with the plan name and new price
      await planUpdate({
        name: editingPlan.originalName,
        price: updateData
      }).unwrap()
      toast('Price updated successfully!')
      // Refetch the plans to get updated data
      await refetch()
      
      setModalOpen(false)
      setEditingPlan(null)
      setNewPrice("")
      
      // Show success message

    } catch (error) {
      console.error("Failed to update plan:", error)
      alert("Failed to update price. Please try again.")
    }
  }

  // Transform API data to component format
  const transformApiPlansToComponentPlans = (apiPlans: ApiPlan[]): PricingPlan[] => {
    if (!apiPlans) return []

    const planConfigs = {
      monthly: {
        displayName: "Monthly",
        period: "Monthly",
        description: "For those who refuse limits.",
        features: [
          { icon: "⚡", text: "Unlimited Quotes" },
          { icon: "🔔", text: "Custom Notifications" },
          { icon: "🏆", text: "Alpha Circle Access" },
        ],
        buttonText: "Subscribe",
        isDark: false
      },
      yearly: {
        displayName: "Yearly",
        period: "Yearly",
        description: "For those who refuse limits.",
        features: [
          { icon: "⚡", text: "Unlimited Quotes" },
          { icon: "🔔", text: "Custom Notifications" },
          { icon: "🏆", text: "Alpha Circle Access" },
        ],
        buttonText: "Subscribe",
        isDark: false
      },
      lifetime: {
        displayName: "Life-Time",
        period: "One-time",
        description: "For those who refuse limits.",
        features: [
          { icon: "⚡", text: "Unlimited Quotes" },
          { icon: "🔔", text: "Custom Notifications" },
          { icon: "🏆", text: "Alpha Circle Access" },
        ],
        buttonText: "Subscribe",
        isDark: false
      },
      free: {
        displayName: "Free",
        period: "",
        description: "For those who refuse limits.",
        features: [
          { icon: "•", text: "Limited quotes per day" },
          { icon: "•", text: "1 daily notification" },
          { icon: "•", text: "No leaderboard access" },
          { icon: "•", text: "No badges unlocked" },
        ],
        buttonText: "Get Free",
        isDark: true
      }
    }

    return apiPlans.map(apiPlan => {
      const config = planConfigs[apiPlan.name as keyof typeof planConfigs]
      if (!config) return null

      const price = apiPlan.price === 0 ? "Free" : `$${apiPlan.price}`
      const buttonText = apiPlan.price === 0 
        ? "Get Free" 
        : `Subscribe ${price}${config.period ? ` / ${config.period}` : ''}`

      return {
        name: config.displayName,
        price: price,
        period: config.period,
        description: config.description,
        features: config.features,
        buttonText: buttonText,
        buttonAction: () => handleSubscribe(config.displayName),
        isDark: config.isDark,
        originalName: apiPlan.name // Store the API name for updates
      }
    }).filter(Boolean) as PricingPlan[]
  }

  const plans = transformApiPlansToComponentPlans(subsPlan || [])

  if (isLoading) {
    return (
      <div className="w-full mx-auto">
        <div className='mt-5 pb-5 mx-5'>
          <h2 className='text-[32px] font-semibold'>Subscriptions & Payments</h2>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading plans...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full mx-auto">
        <div className='mt-5 pb-5 mx-5'>
          <h2 className='text-[32px] font-semibold'>Subscriptions & Payments</h2>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-red-500">Error loading plans</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto ">
      <Toaster />
      <div className='mt-5 pb-5 mx-5'>
        <h2 className='text-[32px] font-semibold'>Subscriptions & Payments</h2>
      </div>

      <div className="rounded-lg mt-4 p-6" style={{
        boxShadow: '0px 0px 10px 0px #0000001A'
      }}>
        <h2 className="text-[25px] pb-5 font-semibold text-foreground">Subscriptions</h2>
        <div className="grid grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 flex flex-col h-full ${
                plan.isDark ? "bg-slate-800 text-white" : "bg-[#343F4F] text-white"
              }`}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {!plan.isDark && (
                    <FaRegEdit 
                      size={20} 
                      className="cursor-pointer hover:text-gray-300 transition-colors"
                      onClick={() => handleEditPlan(plan)}
                    />
                  )}
                </div>
                <p className={`text-sm ${plan.isDark ? "text-white" : "text-white"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="text-2xl font-bold">{plan.price}</div>
                {plan.period && (
                  <div className="text-sm text-gray-300">{plan.period}</div>
                )}
              </div>

              {/* Features */}
              <div className="flex-1 mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <span className="text-yellow-400 text-sm mt-0.5">{feature.icon}</span>
                      <span className="text-sm leading-relaxed">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={plan.buttonAction}
                className={`w-full py-3 px-4 rounded-[25px] font-medium text-sm text-black transition-colors bg-white hover:bg-gray-100`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Price Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit {editingPlan?.name} Price</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new price"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setModalOpen(false)
                  setEditingPlan(null)
                  setNewPrice("")
                }}
                className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-300 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <TableSection type="plan" />
    </div>
  )
}