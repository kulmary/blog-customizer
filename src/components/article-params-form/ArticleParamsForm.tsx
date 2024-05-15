import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { SyntheticEvent } from 'react';
import { RadioGroup } from '../radio-group';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { Text } from '../text';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType,
	setCurrentArticleState: (param: any) => void
}

export const ArticleParamsForm = ({ currentArticleState, setCurrentArticleState }: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
	const [newFontColor, setNewFontColor] = useState(currentArticleState.fontColor);
	const [newFontSizeOption, setNewFontSizeOption] = useState(currentArticleState.fontSizeOption);
	const [newFontFamilyOption, setNewFontFamilyOption] = useState(currentArticleState.fontFamilyOption);
	const [newContentWidth, setNewContentWidth] = useState(currentArticleState.contentWidth);
	const [newBackgroundColor, setNewBackgroundColor] = useState(currentArticleState.backgroundColor)

	useOutsideClickClose({ isOpen: isOpenForm, rootRef: rootRef, onClose: () => setIsOpenForm(false), onChange: setIsOpenForm })

	const formSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontColor: newFontColor,
			fontSizeOption: newFontSizeOption,
			fontFamilyOption: newFontFamilyOption,
			contentWidth: newContentWidth,
			backgroundColor: newBackgroundColor
		})
	}

	const formResetHandler = () => {
		setCurrentArticleState({
			...currentArticleState,
			fontColor: defaultArticleState.fontColor,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			contentWidth: defaultArticleState.contentWidth,
			backgroundColor: defaultArticleState.backgroundColor
		})
        setNewFontFamilyOption(fontFamilyOptions[0]);
		setNewBackgroundColor(backgroundColors[0]);
		setNewContentWidth(contentWidthArr[0]);
		setNewFontSizeOption(fontSizeOptions[0]);
		setNewFontColor(fontColors[0]);
	}

	return (
		<>
			<ArrowButton onClick={setIsOpenForm} isOpenForm={isOpenForm} />
			<aside ref={rootRef} className={clsx(styles.container, isOpenForm && styles.container_open)}>
				<form className={styles.form} onSubmit={formSubmitHandler} onAbort={formResetHandler}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>Задайте параметры</Text>
					<Select options={fontFamilyOptions} selected={newFontFamilyOption} title='Шрифт' onChange={setNewFontFamilyOption}></Select>
					<RadioGroup name='Размер' options={fontSizeOptions} selected={newFontSizeOption} title='Размер шрифта' onChange={setNewFontSizeOption}></RadioGroup>
					<Select options={fontColors} selected={newFontColor} title='Цвет шрифта' onChange={setNewFontColor}></Select>
					<Separator></Separator>
					<Select options={backgroundColors} selected={newBackgroundColor} title='Цвет фона' onChange={setNewBackgroundColor}></Select>
					<Select options={contentWidthArr} selected={newContentWidth} title='Ширина контента' onChange={setNewContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formResetHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
