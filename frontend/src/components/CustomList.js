import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

function CustomList({ title, items, checked, numberOfChecked, handleToggle, handleToggleAll }){
    
    return (
        <Card>
            <CardHeader
            sx={{ px: 2, py: 1 }}
            avatar={
                <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={
                    numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{
                    'aria-label': 'all items selected',
                }}
                />
            }
            title={
                (title) === "Ranked" ? (
                    <div>
                    {title}
                    <ArrowDownwardIcon/>
                    </div>
                ) : (
                    title
                )
            }
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 250,
                    height: 250,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
            {items.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                <ListItem
                    key={value}
                    role="listitem"
                    button
                    onClick={handleToggle(value)}
                >
                    <ListItemIcon>
                    <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                        'aria-labelledby': labelId,
                        }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                </ListItem>
                );
            })}
            <ListItem />
            </List>
        </Card>
    )
};

export default CustomList