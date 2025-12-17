import { Droppable } from "@hello-pangea/dnd";
import { FixedSizeList as List } from "react-window";
import Card from "./Card";

function Column({ column, tasks, socket, onDelete }) {
  return (
    <div className="column">
      <h2>{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List
              height={500}
              itemCount={tasks.length}
              itemSize={120}
              width={"100%"}
            >
              {({ index, style }) => (
                <div style={style}>
                  <Card
                    task={tasks[index]}
                    index={index}
                    socket={socket}
                    onDelete={onDelete}
                  />
                </div>
              )}
            </List>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
