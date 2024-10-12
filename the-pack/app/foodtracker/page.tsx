//Need navbar at the bottom at constant times for choosing section

export default function FoodTracker()
{
    return(
        <div>
            
            <div className="flex justify-between mb-1">
                
                <span className="text-base font-medium text-blue-700 dark:text-white">Calories</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">45%{/*PUT DATA PERCENT HERE */}</span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">

                <div className="bg-blue-600 h-2.5 rounded-full" style ={{width: "45%"}}>

                </div>
            </div>

        </div>
    )
}