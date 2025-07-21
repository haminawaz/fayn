"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PropertyForm from "@/components/shared/PropertyForm";
import { PropertyFormData } from "@/types";
import { toast } from "sonner";
import { saveFlatToStorage } from "@/utils/localStorage";

interface AddFlatPageProps {
  onBack: () => void;
}

function generateInstallments({
  price,
  downPayment,
  duration,
  frequency,
}: {
  price: number;
  downPayment: number;
  duration: number;
  frequency: "Monthly" | "Bi-Monthly" | "Quarterly";
}) {
  const remaining = price - downPayment;

  let periodsPerYear = 12;
  if (frequency === "Quarterly") periodsPerYear = 4;
  else if (frequency === "Bi-Monthly") periodsPerYear = 6;

  const totalInstallments = Math.floor(duration * periodsPerYear);
  const amount = Math.round(remaining / totalInstallments);

  const today = new Date();
  const installments = [];

  for (let i = 0; i < totalInstallments; i++) {
    const dueDate = new Date(today);
    dueDate.setMonth(today.getMonth() + i * (12 / periodsPerYear));

    installments.push({
      id: `${i + 1}`,
      number: i + 1,
      amount,
      dueDate: dueDate.toISOString().split("T")[0],
      status: "pending",
    });
  }

  return installments;
}

export default function AddFlatPage({ onBack }: AddFlatPageProps) {
  const handleSubmit = (data: PropertyFormData) => {
    const { downPaymentPercentage, ...rest } = data;
    const downPayment = (rest.price * downPaymentPercentage) / 100;
    const installments = generateInstallments({
      price: data.price,
      downPayment,
      duration: data.duration,
      frequency: data.frequency as "Monthly" | "Quarterly" | "Bi-Monthly",
    });

    const newFlat = {
      ...data,
      id: uuidv4(),
      type: "flat",
      status: "pending",
      completed: 0,
      downPayment,
      total: 0,
      overdue: 0,
      installments,
    };

    saveFlatToStorage(newFlat);
    toast.success("Flat added successfully!");
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Flat</h1>
          <p className="text-gray-600">Create a new flat property</p>
        </div>
      </div>

      <PropertyForm type="flat" onSubmit={handleSubmit} onCancel={onBack} />
    </div>
  );
}
