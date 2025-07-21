"use client";

import { useState } from "react";
import { Property } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import { cn } from "@/lib/utils";
const STORAGE_KEY = 'flats';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [installments, setInstallments] = useState(property.installments);
  const [showInstallments, setShowInstallments] = useState(false);

  const downPaymentPercentage = (property.downPayment / property.price) * 100;

  const markAsPaid = (id: string) => {
    const updatedInstallments = installments.map((inst) =>
      inst.id === id
        ? {
            ...inst,
            status: "completed",
            paidDate: new Date().toISOString(),
          }
        : inst
    );
    setInstallments(updatedInstallments);

    // 2. Directly update localStorage by replacing this single flat
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const flats = JSON.parse(raw); // array of Property
    const updatedFlats = flats.map((f: Property) =>
      f.id === property.id ? { ...f, installments: updatedInstallments } : f
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlats));
  };

  const overdueAmount = installments
  .filter((i) => i.status === "overdue")
  .reduce((total, i) => total + i.amount, 0);


  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {property.name}
            </h3>
            {property.floor && (
              <p className="text-sm text-gray-600">Floor {property.floor}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(property.price)}
            </p>
            <p className="text-sm text-gray-600">
              {downPaymentPercentage}% down payment
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-gray-600">
              Duration:
              <span className="font-bold"> {property.duration} Years</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-gray-600">
              Frequency:<span className="font-bold"> {property.frequency}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">
              Completed:
              <span className="font-bold">
                {" "}
                {
                  installments.filter(
                    (installment) => installment.status === "completed"
                  ).length
                }
                /{installments.length}
              </span>
            </span>
          </div>
          {overdueAmount > 0 && (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600">
                Overdue: {formatCurrency(overdueAmount)}
              </span>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowInstallments(!showInstallments)}
        >
          {showInstallments ? "Hide" : "Show"} Installments (
          {installments.length})
          {showInstallments ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        {showInstallments && installments.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <h4 className="font-medium text-gray-900">Installment Schedule</h4>
            {installments.map((installment) => (
              <div
                key={installment.id}
                onClick={() =>
                  installment.status !== "completed" &&
                  markAsPaid(installment.id)
                }
                className={cn(
                  "p-3 rounded-lg border-2 transition-all cursor-pointer",
                  installment.status === "completed" &&
                    "border-green-200 bg-green-50",
                  installment.status === "overdue" &&
                    "border-red-200 bg-red-50 animate-pulse",
                  installment.status === "pending" &&
                    "border-gray-200 bg-gray-50"
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">
                      Installment #{installment.number}
                    </p>
                    <p className="text-xs text-gray-600">
                      Due: {new Date(installment.dueDate).toLocaleDateString()}
                    </p>
                    {installment.paidDate && (
                      <p className="text-xs text-green-600">
                        Paid:{" "}
                        {new Date(installment.paidDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(installment.amount)}
                    </p>
                    <Badge
                      variant={
                        installment.status === "completed"
                          ? "default"
                          : installment.status === "overdue"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {installment.status === "completed"
                        ? "Paid"
                        : installment.status === "overdue"
                        ? "Overdue"
                        : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
