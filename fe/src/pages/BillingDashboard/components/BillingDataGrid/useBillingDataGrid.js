import {useGetEfficiencies} from "../../../../hooks/useGetEfficiencies";
import {useGetRigs} from "../../../../hooks/useGetRigs";
import {useEffect, useState} from "react";

import {billingFormatEfficiencies} from "../../../../utils/billingFormatEfficiencies";
import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useBillingDataGrid = () => {
  const {efficiencies, rigs, isLoading} = useBillingDashboard();

  const transformedData = [
    {id: 2, taxName: "availableHoursBilling", lineName: "Horas Disponível"},
    {id: 3, taxName: "dtmLessThanTwentyBilling", lineName: "DTM <= 20"},
    {
      id: 4,
      taxName: "dtmBetweenTwentyAndFiftyBilling",
      lineName: "20 < DTM <= 50",
    },
    {id: 15, taxName: "dtmGreaterThanFiftyBilling", lineName: "DTM > 50"},
    {
      id: 5,
      taxName: "equipmentLessThanTwentyBilling",
      lineName: "Taxa Equipamento < 20",
    },
    {
      id: 6,
      taxName: "equipmentBetweenTwentyAndFiftyBilling",
      lineName: "20 < Taxa Equipamento <= 50 ",
    },
    {
      id: 7,
      taxName: "equipmentGreaterThanFiftyBilling",
      lineName: "Taxa Equipamento > 50",
    },
    {
      id: 8,
      taxName: "fluidLessThanTwentyBilling",
      lineName: "Taxa Flúido < 20",
    },
    {
      id: 9,
      taxName: "fluidBetweenTwentyAndFiftyBilling",
      lineName: "20 < Taxa Flúido <= 50 ",
    },
    {
      id: 10,
      taxName: "fluidGreaterThanFiftyBilling",
      lineName: "Taxa Flúdio > 50",
    },
  ];

  let billingArray = billingFormatEfficiencies(efficiencies);

  if (billingArray.length > 0) {
    billingArray.forEach((item) => {
      transformedData.forEach((tax) => {
        if (!tax.hasOwnProperty(item.rig)) {
          tax[item.rig] = {};
        }
        tax[item.rig] = item[tax.taxName];
      });
    });
  }

  return {
    hasData: billingArray.length > 0 ? true : false,
    efficiencies,
    efficienciesToDataGrid: transformedData,
    rigs,
    isLoading,
  };
};
