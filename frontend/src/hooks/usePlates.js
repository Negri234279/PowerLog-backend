import { useEffect, useState } from "react"

export const usePlates = (weightTotal, weightBar) => {
    /*const [weight, setWeight] = useState(parseInt((weightTotal - bar) / 2))
    const [numPlates, setNumPlates] = useState({
        plate25: 0,
        plate20: 0,
        plate15: 0,
        plate10: 0,
        plate5: 0,
        plate2: 0,
        plate1: 0,
    })*/
    let weight = parseFloat((weightTotal - weightBar) / 2),
        plate25 = 0,
        plate20 = 0,
        plate15 = 0,
        plate10 = 0,
        plate5 = 0,
        plate2 = 0,
        plate1 = 0

    //if (weightTotal.toString().endsWith('2')) weight += 0.25
    //else if (weightTotal.toString().endsWith('5')) weight += 0.5
    //else if (weightTotal.toString().endsWith('7')) weight += 0.25
    if (weightTotal.toString().endsWith('2') || weightTotal.toString().endsWith('7')) weight += 0.25

    while (weight > 0) {
        switch (weight > 0) {
            case weight >= 25:
                weight -= 25
                plate25 += 1
                break
            case weight >= 20:
                weight -= 20
                plate20 += 1
                break
            case weight >= 15:
                weight -= 15
                plate15 += 1
                break
            case weight >= 10:
                weight -= 10
                plate10 += 1
                break
            case weight >= 5:
                weight -= 5
                plate5 += 1
                break
            case weight >= 2:
                weight -= 2.5
                plate2 += 1
                break
            case weight >= 1:
                weight -= 1.25
                plate1 += 1
                break
            default:
                weight = 0
                break
        }
    }

    return { plate25, plate20, plate15, plate10, plate5, plate2, plate1 }
}