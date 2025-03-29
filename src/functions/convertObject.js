export const coinObject = (setState, data) => {
    //console.log("DAATA -----", data);
    setState({
        id: data?.id,
        name: data?.name,
        symbol: data?.symbol,
        slug: data?.slug,
        image: data?.logo,
        desc: data?.desc || "No Description Available", // Use desc or fallback
        total_supply: data?.total_supply,
        price_change_percentage_24h: data?.price_change_percentage_24h ,
        current_price:  data?.current_price || "NA",
        market_cap: data?.market_cap || "NA",
    });
};