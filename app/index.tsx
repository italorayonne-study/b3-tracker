import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoagind] = useState(true)
  const [error, setError] = useState()
  const [response, setResponse] = useState()

  useEffect(() => {
    fetch('https://brapi.dev/api/quote/list?search=VALE3&limit=2', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer popeYQfXMTauF2XpUzobK4d',
      }
    })
      .then(response => response.json())
      .then((result) => {
        setIsLoagind(false);
        setResponse(result)
      }, (error) => {
        setIsLoagind(false)
        setError(error)
      })
  }, [])

  const getContent = () => {

    if (isLoading) return <ActivityIndicator size={"large"} />

    if(error) return <Text>{error}</Text>

    return <Image src="https://s3-symbol-logo.tradingview.com/vale--big.svg"></Image>
    // return <Image>{response["stocks"][0]["close"]}</Text>
  }

  return (
    <View className="flex-1 items-center justify-center">
      {getContent()}
    </View> 
  );
}
