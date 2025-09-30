"use client"

import { useState } from "react"
import Leaderboard from "../Overview/CommonTabel"
import { FiEdit } from "react-icons/fi"
import { FaRegEdit } from "react-icons/fa"
import CommonModal from './../Overview/Modal/CommonModal';

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
}

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName)
    console.log(`[v0] Subscribing to ${planName}`)
    // Add your subscription logic here
  }

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan)
    setModalOpen(true)
  }

  const handleSavePlan = (data: any) => {
    console.log('Saving plan data:', data)
    console.log('Original plan:', editingPlan)
    // Add your save logic here
    setModalOpen(false)
    setEditingPlan(null)
  }

  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "Free",
      description: "For those who refuse limits.",
      features: [
        { icon: "•", text: "Limited quotes per day" },
        { icon: "•", text: "1 daily notification" },
        { icon: "•", text: "No leaderboard access" },
        { icon: "•", text: "No badges unlocked" },
      ],
      buttonText: "Get Free",
      buttonAction: () => handleSubscribe("Free"),
      isDark: true,
    },
    {
      name: "Premium",
      price: "$4.99",
      period: "Monthly",
      description: "For those who refuse limits.",
      features: [
        { icon: "⚡", text: "Unlimited Quotes" },
        { icon: "🔔", text: "Custom Notifications" },
        { icon: "🏆", text: "Alpha Circle Access" },
      ],
      buttonText: "Subscribe $4.99 / Monthly",
      buttonAction: () => handleSubscribe("Premium Monthly"),
    },
    {
      name: "Premium",
      price: "$39.99",
      period: "Yearly",
      description: "For those who refuse limits.",
      features: [
        { icon: "⚡", text: "Unlimited Quotes" },
        { icon: "🔔", text: "Custom Notifications" },
        { icon: "🏆", text: "Alpha Circle Access" },
      ],
      buttonText: "Subscribe $39.99 / Yearly",
      buttonAction: () => handleSubscribe("Premium Yearly"),
    },
    {
      name: "Premium",
      price: "$89.99",
      period: "One-time",
      description: "For those who refuse limits.",
      features: [
        { icon: "⚡", text: "Unlimited Quotes" },
        { icon: "🔔", text: "Custom Notifications" },
        { icon: "🏆", text: "Alpha Circle Access" },
      ],
      buttonText: "Subscribe $89.99 / One-time",
      buttonAction: () => handleSubscribe("Premium One-time"),
    },
  ]

  return (
    <div className="w-full mx-auto ">
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

      {/* Edit Pricing Modal */}
      <CommonModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingPlan(null)
        }}
        onSave={handleSavePlan}
        title="Edit"
        type="pricing-edit"
        initialData={editingPlan ? {
          name: editingPlan.name,
          cost: editingPlan.price,
          feature: editingPlan.features.map(f => f.text).join('\n')
        } : {}}
      />

      <Leaderboard />
    </div>
  )
}