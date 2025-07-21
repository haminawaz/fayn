"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import PropertyList from "@/components/shared/PropertyList";
import { mockFlats } from "@/utils/mockData";
import { getFlatsFromStorage } from "@/utils/localStorage";
import { Property } from "@/types";

interface FlatsPageProps {
  onAddFlat: () => void;
}

export default function FlatsPage({ onAddFlat }: FlatsPageProps) {
  const [flats, setFlats] = useState<Property[]>([]);

  useEffect(() => {
    const storedFlats = getFlatsFromStorage();
    setFlats(storedFlats);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flats</h1>
          <p className="text-gray-600">Manage your flat properties</p>
        </div>
        <Button
          onClick={onAddFlat}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Flat
        </Button>
      </div>
      {flats.length > 0 ? (
        <PropertyList properties={flats} type="flat" />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <Building2 className="h-12 w-12 mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700 mb-1">
            No Flats Found
          </h2>
          <p className="text-sm">
            Click `Add Flat` to create your first property.
          </p>
        </div>
      )}
    </div>
  );
}
