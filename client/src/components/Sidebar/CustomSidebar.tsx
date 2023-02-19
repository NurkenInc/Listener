import React, { useEffect, useState, useRef, RefAttributes, BaseSyntheticEvent } from 'react';
import { TDeck } from '../../api/getDecks';
import { createDeck, createCard, deleteCard, deleteDeck, getDecks } from '../../api/index';
import { createBrowserRouter, Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { faNoteSticky, faPlus, faTrash, faPenToSquare, faFile, faBars , faStar, faUsers, faMoon, faSun, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { Switch } from '../Switch/Switch';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';1
import { SidebarFooter } from '../SidebarFooter/SidebarFooter';
import { Badge } from '../Badge/Badge';
import { TypographyProReact } from '../Typography/Typography';
import EditNoteNameModal from '../CreateAndEditModal/CreateAndEditModal';
import { updateDeck } from '../../api/updateDeck';
import { updateCard } from '../../api/updateCard';
import CreateAndEditModal from '../CreateAndEditModal/CreateAndEditModal';
import CreateCardModal from '../CreateCardModal/CreateCardModal';
import { push as BurgerMenu } from 'react-burger-menu';
import '../BurgerMenu/BurgerMenu.css';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#fff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: 'black',
      hover: {
        backgroundColor: '#e6f2fd',
        color: '#44596e',
      },
      active: {
        backgroundColor: '#13395e',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#0e3052',
        color: '#b6c8d9',
      },
      active: {
        backgroundColor: '#13395e',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

let isCardCreated = false; 

export async function handleOnSubmitCreateCard(deckId: string, card : object) {
    isCardCreated = !isCardCreated;
    await createCard(deckId!, card);
}

export default function CustomSidebar(props:any) {
    const [decks, setDecks] = useState<TDeck[]>([]);
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState('');
    const [noteName, setNoteName] = useState('');
    const [selectedItemId, setSelectedItemId] = useState('');
    const [editNoteNameModalToggler, setEditNoteNameModalToggler] = useState(false);

    const userId = JSON.parse(localStorage.getItem('profile')!).result._id;

    const { deckId } = useParams();

    const history = useNavigate();

    const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

    const [theme, setTheme] = React.useState<Theme>('light');
    
    function toggleEditNoteNameModal() {
        setEditNoteNameModalToggler((editNoteNameModalToggler) => (!editNoteNameModalToggler));   
    }

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const menuItemStyles: MenuItemStyles = {
        root: {
        fontSize: '13px',
        fontWeight: 400,
        },
        icon: {
        color: themes[theme].menu.icon,
        },
        SubMenuExpandIcon: {
        color: '#b6b7b9',
        },
        subMenuContent: {
        backgroundColor: themes[theme].menu.menuContent,
        },
        button: {
        [`&.${menuClasses.active}`]: {
            backgroundColor: themes[theme].menu.active.backgroundColor,
            color: themes[theme].menu.active.color,
        },
        [`&.${menuClasses.disabled}`]: {
            color: themes[theme].menu.disabled.color,
        },
        '&:hover': {
            backgroundColor: themes[theme].menu.hover.backgroundColor,
            color: themes[theme].menu.hover.color,
        },
        },
        label: ({ open }) => ({
        fontWeight: open ? 600 : undefined,
        }),
    };

    async function handleUpdateDeck(deckId: string, deck: TDeck) {
        await updateDeck(deckId, deck);
        const newDecks = await getDecks();
        setDecks(newDecks);
    }

    async function handleUpdateCard(deckId: string, card: [], index: number) {
        await updateCard(deckId, card, index);
        const newDecks = await getDecks();
        setDecks(newDecks);
    }

    async function handleUpdateCardTitle(deckId: string, cardNewName: string, index: number) {
        const deck = decks.find(x => x._id === deckId);
        const deckIndex = decks.findIndex(x =>x._id === deckId);
        deck!.cards[index].name = cardNewName;
        setDecks([...decks.splice(0, deckIndex), deck!, ...decks.splice(deckIndex + 1)])
        await updateCard(deckId, deck!.cards, index);
    }

    async function handleCreateDeck(e: React.FormEvent, title : string) {
        e.preventDefault();
        const deck = await createDeck(title);
        setDecks([...decks, deck]);
        setTitle("");
    }
    
    async function handleDeleteDeck(deckId: string) {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck._id !==deckId));
        history('/');
    }

    async function handleDeleteCard(deckId: string, index: number) {
        const newDeck = await deleteCard(deckId, index); 
        const deckIndex = decks.findIndex(x =>x._id === deckId);
        setDecks([...decks.splice(0, deckIndex), newDeck!, ...decks.splice(deckIndex + 1)]);
        history('/'); 
    } 
    
    useEffect(() => {
        async function fetchDecks() {
            const newDecks = await getDecks();
            const result = newDecks.filter((deck) => (deck.creator === userId));
            setDecks(result);
        }
        fetchDecks();
        // 514
    }, [deckId]);

    useEffect(() => {
        async function fetchDecks() {
            const newDecks = await getDecks();
            const result = newDecks.filter((deck) => (deck.creator === userId));
            setDecks(result);
        }
        fetchDecks();
    }, [isCardCreated])

    return ( 
            <BurgerMenu {...props}>
            <div className="flex h-[100vh]">
                <Sidebar
                    onClick={() => collapseSidebar(false)}
                    image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
                    backgroundColor={themes[theme].sidebar.backgroundColor}
                    rootStyles={{
                    color: themes[theme].sidebar.color,
                    }}
                    className="h-[100vh]"
                >
                    <div>

                    </div>
                    <div className='flex flex-col h-[100%]'>
                    <SidebarHeader className='mb-[24px] mt-[16px]' />
                    <div className='flex-1 mb-[32px]'>
                        <div className='px-0 py-0'>
                        <div className='px-[24px] py-0 mb-[8px] mt-[32px]'>
                        <TypographyProReact
                            variant="body2"
                            fontWeight={600}
                            style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                            className="text-center"
                        >
                            General
                        </TypographyProReact>
                        </div>
                        <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem onClick={() => {history('/listener');}} icon={<FontAwesomeIcon icon={faStar} />} suffix={<Badge variant="success">New</Badge>} className='text-left'>
                            Get Started
                        </MenuItem>
                        </Menu>
                        <TypographyProReact
                            variant="body2"
                            fontWeight={600}
                            style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                            className="text-center"
                        >
                            Notes
                        </TypographyProReact>
                        </div>
                        <Menu menuItemStyles={menuItemStyles}>
                            <MenuItem 
                                id="createFolder" 
                                icon={<FontAwesomeIcon icon={faPlus}/>} 
                                className='text-left' 
                                onClick={() => {
                                    setSelectedItemId('createFolder');
                                    editNoteNameModalToggler !== true ? setEditNoteNameModalToggler(true) : {};
                                }}
                                suffix={
                                    editNoteNameModalToggler === true && selectedItemId === 'createFolder' ? 
                                    <div className='relative'>
                                        <CreateAndEditModal placeholder={'Untitled'} onChange={setNoteName} onClick={(e : React.FormEvent) => {
                                            e.preventDefault();
                                            setEditNoteNameModalToggler(false);
                                            const title = noteName.length === 0 ? 'Untitled' : noteName;
                                            handleCreateDeck(e, title);
                                        }}/> 
                                    </div>
                                    :
                                    ''
                                }
                                >
                                    {editNoteNameModalToggler === true && selectedItemId === 'createFolder' ? '' : 'Create new folder'} 
                            </MenuItem>
                        {
                                decks.map((deck, index) => (
                                    <SubMenu
                                    onClick={(event : any) => {
                                            setSelectedItemId(deck._id);  
                                            if(event.target.classList.contains('add-note') === false && event.target.className.baseVal !== '') {
                                                history(`/listener/decks/${deck._id}`)
                                            }
                                        }
                                    }
                                    key={index}
                                        icon={<FontAwesomeIcon icon={faFolder} />} 
                                        label={editNoteNameModalToggler === true && selectedItemId === deck._id ? '' : deck.title} 
                                        suffix={
                                                editNoteNameModalToggler === true && selectedItemId === deck._id ? 
                                                <div className='relative'>
                                                    <CreateAndEditModal placeholder={deck.title} onChange={setNoteName} onClick={(e : React.FormEvent) => {
                                                        e.preventDefault();
                                                        setEditNoteNameModalToggler(false);
                                                        deck.title = noteName.length === 0 ? deck.title : noteName;
                                                        handleUpdateDeck(deck._id, deck);
                                                        }}/> 
                                                </div>
                                                :
                                                <div className='flex flex-row'>
                                                    <button style={theme === 'dark' ? {backgroundColor: 'rgb(11 41 72)', color: 'rgb(59 130 246 / 0.8)'} : {}} className= 'add-note px-[8px] py-[3px]' onClick={() =>{history(`/listener/decks/${deck._id}/cards`)}}><FontAwesomeIcon icon={faPlus} /></button>
                                                    <button style={theme === 'dark' ? {backgroundColor: 'rgb(11 41 72)', color: 'rgb(59 130 246 / 0.8)'} : {}} className='px-[8px] py-[3px]' onClick={() => handleDeleteDeck(deck._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button style={theme === 'dark' ? {backgroundColor: 'rgb(11 41 72)', color: 'rgb(59 130 246 / 0.8)'} : {}} className='px-[8px] py-[3px]' onClick={toggleEditNoteNameModal}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                </div> 
                                        }
                                        style={
                                            selectedItemId === deck._id ? { color: "#02a3e8" } : {}
                                        }
                                        className='text-left'
                                        component="div"
                                    >
                                        {deck.cards.map((card, index) => (
                                                <MenuItem
                                                    onClick={() => {setSelectedItemId(`${deck._id}-${index.toString()}`); history(`/listener/decks/${deck._id}/cards/${index}`, {state: {cardData: decks.find(x => x._id === deck._id)!.cards[index]}})}}
                                                    key={index}
                                                    icon={<FontAwesomeIcon icon={faNoteSticky} />}
                                                    suffix={
                                                        editNoteNameModalToggler === true && selectedItemId === `${deck._id}-${index.toString()}` ? 
                                                        <div className='relative'>
                                                            <CreateAndEditModal placeholder={card.name} onChange={setNoteName} onClick={(e : React.FormEvent) => {
                                                                e.preventDefault();
                                                                setEditNoteNameModalToggler(false);
                                                                const newCardName = noteName.length === 0 ? card.name : noteName;
                                                                handleUpdateCardTitle(deck._id, noteName, index);
                                                                }}/> 
                                                        </div>
                                                        :
                                                        <div className='flex flex-row'>
                                                            <button className='px-[8px] py-[3px]' onClick={() => handleDeleteCard(deck._id, index)}><FontAwesomeIcon icon={faTrash} /></button>
                                                            <button className='px-[8px] py-[3px]' onClick={toggleEditNoteNameModal}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                        </div> 
                                                    }
                                                    style={
                                                        selectedItemId === `${deck._id}-${index.toString()}` ? { color: "#02a3e8" } : {}
                                                    }
                                                    component='div'
                                                    >
                                                        {/* <Link to={`/decks/${deck._id}/cards/${index}`} state={{cardData: decks.find(x => x._id === deck._id)!.cards[index]}}> */}
                                                            {card.name}
                                                        {/* </Link> */}
                                                </MenuItem>
                                        ))}
                                    </SubMenu>
                                ))
                                }
                        </Menu>
                        <TypographyProReact
                            variant="body2"
                            fontWeight={600}
                            style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                            className="text-center"
                        >
                            Settings
                        </TypographyProReact>
                        <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem icon={<FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className='h-[15px] w-[15px]' />} className='text-left'>
                            <div className='flex flex-row gap-6'>    
                                Sidebar Theme
                                <Switch
                                    id="theme"
                                    checked={theme === 'dark'}
                                    onChange={handleThemeChange}
                                />
                            </div>
                        </MenuItem>
                        <MenuItem icon={<FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className='h-[15px] w-[15px]' />} className='text-left'>
                            <div className='flex flex-row gap-6'>    
                                Collapse
                                <Switch
                                    id="theme"
                                    checked={collapsed === true}
                                    onChange={() => collapseSidebar(true)}
                                />
                            </div>
                        </MenuItem>
                        </Menu>
                    </div>
                    <SidebarFooter collapsed={collapsed} />
                    </div>
                </Sidebar>
            </div>     
        </BurgerMenu>
    );
}