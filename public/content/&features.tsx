//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";


//
//  CONTENT
//

// CONTENT -> FUNCTION
export default function $_features(): ß.react.ReactNode {
    // FUNCTION -> USESTATE
    const [cards, setCards] = ß.react.useState([]);
    // FUNCTION -> USEREF
    const getVia = ß.react.useRef<$.via>(null);
    const createVia = ß.react.useRef<$.via>(null);
    // FUNCTION -> USEEFFECT
    ß.react.useEffect(() => {
        $.setTitle("Features | Abscissa");
        $.setDescription("Feature roadmap. Vote on what features you'd like to see or suggest new ones!");
        getVia.current = new $.via("features/get", (data: FeaturesGetResponse) => {
            setCards(data.features);
        });
        createVia.current = new $.via("features/create", (data: FeaturesCreateResponse) => {
            getVia.current.send<FeaturesGetRequest>({});
        });
        getVia.current.send<FeaturesGetRequest>({});
        return () => {
            createVia.current.close();
            getVia.current.close();
        }
    }, []);
    return (
        <ß.$Main navbar="$Usual">
            <div className="w-full h-full flex flex-col items-center text-center p-6">
                <h1 className="text-4xl font-bold mb-5">Feature dashboard</h1>
                <h2 className="text-xl font-semibold mb-4 text-gray-300">List of upcoming features</h2>
                <ß.Button.$Small text="Create a new suggestion" action={() => null} className="mb-8 w-48" tooltip="Soon!"/>
                <div className="flex-1 max-w-3xl grid grid-cols-1 gap-4">
                    {cards.map((card, index) => (
                        <div 
                            key={card.Fid} 
                            className="h-48 bg-secondary-950 rounded-lg p-6 border flex flex-col text-start"
                        >
                            <h3 className="text-xl font-semibold">{card.Fname}</h3>
                            <p className="flex-1 min-h-0 text-gray-600 overflow-hidden text-ellipsis">{card.Ftext}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ß.$Main>
    )
}