import BottomSheetUsage from '@/components/SheetModal';
import { AppTextStyle, Typography } from '@/components/Typography';
import { COLORS } from '@/theme/colors';
import { CONTACTS } from '@/utils/appData';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import { Pressable, SectionList, StyleSheet, TextInput, View } from 'react-native';
import * as SVG from '../../assets/icons';
import BeneficiaryContactitem from './ContactItem';
import DeleteMfbBeneficiary from './DeleteBeneficiary';
// import BeneficiaryContactitem from '../ContactItem';
// import DeleteMfbBeneficiary from '../DeleteBeneficiary';

export type ContactType = {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
};

type Section = {
  title: string;
  data: ContactType[];
};

// ✅ Group Contacts into Sections
const groupContacts = (contacts: ContactType[]): Section[] => {

  const grouped: Record<string, ContactType[]> = {};

  contacts.forEach(contact => {
    const letter = contact.name.charAt(0).toUpperCase();

    if (!grouped[letter]) {
      grouped[letter] = [];
    }

    grouped[letter].push(contact);
  });

  return Object.keys(grouped)
    .sort()
    .map(letter => ({
      title: letter,
      data: grouped[letter].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

const BeneficiaryContactList = () => {
  const [search, setSearch] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<ContactType>(
    {} as ContactType,
  );
  const inputRef = useRef<TextInput>(null);
  const sheetRef = useRef<BottomSheet>(null);

  // ✅ Filter logic
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return CONTACTS;

    const query = search.toLowerCase();

    return CONTACTS.filter(contact => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.bank.toLowerCase().includes(query) ||
        contact.accountNumber.includes(query)
      );
    });
  }, [search]);

  // ✅ Sections
  const sections = useMemo(
    () => groupContacts(filteredContacts),
    [filteredContacts],
  );

  const onSearchIconPress = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus the input when search icon is pressed
    }
  };

  const handleBeneficiaryDelete = (beneficiary: ContactType) => {
    setSelectedBeneficiary(beneficiary);
    sheetRef.current?.snapToIndex(0);
  };

  return (
    <>
      <View style={styles.container}>
        {/* 🔍 Search Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputInner}>
            <TextInput
              ref={inputRef}
              placeholder="Search by name, bank, or account number"
              value={search}
              onChangeText={setSearch}
              style={{
                backgroundColor: '#F6F8FA',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingRight: 40, // space for the icon
                paddingVertical: 10,
              }}
            />

            <Pressable
              onPress={onSearchIconPress}
              style={{
                position: 'absolute',
                right: 12,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SVG.Search height={18} width={18} />
            </Pressable>
          </View>
        </View>
        {/* 📋 Section List */}
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled
          showsVerticalScrollIndicator={false}
          //  Section Header 
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={styles.sectionHeaderContainer}
            // backgroundColor="grey50"
            >
              <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.ledgerBlue}>
                {title}
              </Typography>
            </View>
          )}
          //  Item
          renderItem={({ item, index }) => (
            <BeneficiaryContactitem
              handleItemSelect={handleBeneficiaryDelete}
              key={index}
              item={item}
              index={index}
            />
          )}
          //  Section list Empty State setup here
          ListEmptyComponent={() => (
            <View style={styles.listEmptyContainer}>
              <Typography textstyle={AppTextStyle.bodyMedium} color={COLORS.grey300}>
                No contacts found
              </Typography>
            </View>
          )}
        />




      </View>
      <BottomSheetUsage ref={sheetRef}>
        {selectedBeneficiary.id && (
          <DeleteMfbBeneficiary beneficiary={selectedBeneficiary} />
        )}
      </BottomSheetUsage>
    </>
  );
};

export default BeneficiaryContactList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    padding: 10
  },
  inputInner: {
    position: "relative",
    justifyContent: "center"
  },
  sectionHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    // backgroundColor : COLORS.grey50
  },
  listEmptyContainer: {
    padding: 20,
    alignItems: "center"
  }
})