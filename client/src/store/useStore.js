import { create } from 'zustand';

const useStore = create((set) => ({
  containers: [],
  selectedContainer: null,
  windowDoorTypes: [
    { id: 'sliding-glass', name: 'Sliding Glass Door', width: 3, height: 6.67 },
    { id: 'fixed-window', name: 'Fixed Window', width: 4, height: 2 },
    { id: 'entry-door', name: 'Insulated Entry Door', width: 3, height: 6.67 }
  ],
  selectedWindowDoorType: null,
  slabDimensions: { width: 40, depth: 20 },
  designs: [],
  currentDesignName: 'Untitled Design',
  
  addContainer: () => set((state) => ({
    containers: [
      ...state.containers,
      {
        id: `container-${Date.now()}`,
        position: [0, 0, 0],
        windowsDoors: []
      }
    ]
  })),
  
  removeContainer: (id) => set((state) => ({
    containers: state.containers.filter(c => c.id !== id),
    selectedContainer: state.selectedContainer === id ? null : state.selectedContainer
  })),
  
  updateContainerPosition: (id, position) => set((state) => ({
    containers: state.containers.map(c => 
      c.id === id ? { ...c, position } : c
    )
  })),
  
  selectContainer: (id) => set({ selectedContainer: id }),
  
  addWindowDoor: (containerId, windowDoor) => set((state) => ({
    containers: state.containers.map(c =>
      c.id === containerId
        ? { ...c, windowsDoors: [...c.windowsDoors, { ...windowDoor, id: `wd-${Date.now()}` }] }
        : c
    )
  })),
  
  removeWindowDoor: (containerId, windowDoorId) => set((state) => ({
    containers: state.containers.map(c =>
      c.id === containerId
        ? { ...c, windowsDoors: c.windowsDoors.filter(wd => wd.id !== windowDoorId) }
        : c
    )
  })),
  
  selectWindowDoorType: (type) => set({ selectedWindowDoorType: type }),
  
  updateSlabDimensions: (dimensions) => set({ slabDimensions: dimensions }),
  
  loadDesign: (design) => set({
    containers: design.containers,
    slabDimensions: design.slabDimensions,
    currentDesignName: design.name,
    selectedContainer: null,
    selectedWindowDoorType: null
  }),
  
  clearDesign: () => set({
    containers: [],
    selectedContainer: null,
    selectedWindowDoorType: null,
    slabDimensions: { width: 40, depth: 20 },
    currentDesignName: 'Untitled Design'
  }),
  
  setDesigns: (designs) => set({ designs }),
  
  setCurrentDesignName: (name) => set({ currentDesignName: name }),
  
  getCurrentDesign: (state) => ({
    name: state.currentDesignName,
    containers: state.containers,
    slabDimensions: state.slabDimensions,
    createdAt: new Date().toISOString()
  })
}));

export default useStore;
