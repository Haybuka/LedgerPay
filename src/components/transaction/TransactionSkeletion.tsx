import React from 'react';
import { Text, View } from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NUM_ITEMS = 8; // number of skeleton rows

export const TransactionListSkeleton = () => {
    return (
        <View>
            <Text> Loading</Text>
        </View>
        // <FlatList
        //     data={Array.from({ length: NUM_ITEMS })}
        //     keyExtractor={(_, index) => index.toString()}
        //     renderItem={() => (
                // <SkeletonPlaceholder
                    
                // >
                //     <SkeletonPlaceholder borderRadius={4} >
                //         <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginVertical={10}>
                //             <SkeletonPlaceholder.Item width={40} height={40} borderRadius={50} />
                //             <View style={{ flex: 1 }}>
                //                 <SkeletonPlaceholder.Item marginLeft={20}>
                //                     <SkeletonPlaceholder.Item width={120} height={10} />
                //                     <SkeletonPlaceholder.Item marginTop={6} width={120} height={10} />
                //                 </SkeletonPlaceholder.Item>
                //             </View>
                //             <SkeletonPlaceholder.Item >
                //                 <SkeletonPlaceholder.Item width={20} height={30} borderRadius={4} />
                //             </SkeletonPlaceholder.Item>
                //         </SkeletonPlaceholder.Item>
                //     </SkeletonPlaceholder>
                // </SkeletonPlaceholder>
        //     )}
        //     contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 20 }}
        //     showsVerticalScrollIndicator={false}
        // />
    );
};
