import React from 'react';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyIcon } from '../components/ui/MyIcon';



interface Props {
    title: string;
    subTitle?: string;

    rightAction?: ()=>void;
    righActionIcon?: string;

    children?: React.ReactNode;
}

export const MainLayout = ({title, subTitle, rightAction, righActionIcon, children }:Props) => {

    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction
         icon={<MyIcon name="arrow-back-outline"/>}
         onPress={goBack}
        />
    );
    const RenderRightAction = () => {
        if(rightAction===undefined || righActionIcon===undefined) return null;

        return (
            <TopNavigationAction
             onPress={rightAction}
             icon={<MyIcon name={righActionIcon}/>}
            />
        )
    }

  return (
    <Layout style={{paddingTop:top}}>
        <TopNavigation
          title={title}
          subtitle={subTitle}
          alignment="center"
          accessoryLeft={canGoBack() ? renderBackAction : undefined}
          accessoryRight={()=> <RenderRightAction/>}
        />
        <Divider />

        <Layout style={{height:'100%'}}>
            {children}
        </Layout>
    </Layout>
  )
}

